const mongoose = require('mongoose');
const ProblemStatement = require('../src/models/ps.model');
const { analyzeProblemStatement } = require('../src/utils/aiService');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// Function to check if PS exists and process it
async function processProblemStatement(psData) {
    try {
        // Check if PS already exists by ID
        const existingPS = await ProblemStatement.findOne({ id: psData.id });
        
        if (existingPS) {
            console.log(`⏭️  PS with ID ${psData.id} already exists. Skipping...`);
            return {
                success: true,
                action: 'skipped',
                message: `PS ${psData.id} already exists`,
                data: existingPS
            };
        }

        console.log(`🔍 PS with ID ${psData.id} not found. Analyzing with AI...`);

        // Create problem statement text for AI analysis
        const problemStatementText = `
Title: ${psData.title}
Description: ${psData.description}
Organization: ${psData.organization}
Department: ${psData.department}
Category: ${psData.category}
Theme: ${psData.theme}
Contact: ${psData.contact}
${psData.youtube ? `YouTube: ${psData.youtube}` : ''}
${psData.dataset ? `Dataset: ${psData.dataset}` : ''}
        `.trim();

        // Use AI service to analyze the problem statement
        const aiResult = await analyzeProblemStatement(problemStatementText);

        if (!aiResult.success) {
            console.error(`❌ AI analysis failed for PS ${psData.id}:`, aiResult.error);
            return {
                success: false,
                action: 'failed',
                message: `AI analysis failed: ${aiResult.error}`,
                data: null
            };
        }

        console.log(`🤖 AI analysis completed for PS ${psData.id}`);

        // Merge original data with AI-generated data
        const completePS = {
            ...psData,
            tags: aiResult.data.tags || [],
            techStack: aiResult.data.techStack || [],
            summary: aiResult.data.summary || '',
            approach: aiResult.data.approach || [],
            difficultyLevel: aiResult.data.difficultyLevel || 'medium'
        };

        // Save to database
        const newPS = new ProblemStatement(completePS);
        const savedPS = await newPS.save();

        console.log(`✅ Successfully saved PS ${psData.id} with AI-generated data`);

        return {
            success: true,
            action: 'created',
            message: `PS ${psData.id} created successfully`,
            data: savedPS,
            aiData: aiResult.data
        };

    } catch (error) {
        console.error(`❌ Error processing PS ${psData.id}:`, error);
        return {
            success: false,
            action: 'error',
            message: `Error: ${error.message}`,
            data: null
        };
    }
}

// Function to process multiple problem statements
async function processProblemStatements(problemStatements) {
    const results = {
        total: problemStatements.length,
        created: 0,
        skipped: 0,
        failed: 0,
        details: []
    };

    console.log(`🚀 Starting to process ${problemStatements.length} problem statements...`);

    for (let i = 0; i < problemStatements.length; i++) {
        const ps = problemStatements[i];
        console.log(`\n📋 Processing ${i + 1}/${problemStatements.length}: ${ps.title.substring(0, 50)}...`);

        const result = await processProblemStatement(ps);
        results.details.push(result);

        switch (result.action) {
            case 'created':
                results.created++;
                break;
            case 'skipped':
                results.skipped++;
                break;
            default:
                results.failed++;
        }

        // Add delay to avoid overwhelming the AI service
        if (i < problemStatements.length - 1) {
            console.log('⏳ Waiting 2 seconds before next PS...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    return results;
}

// Function to load problem statements from JSON file
function loadProblemStatementsFromFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const problemStatements = JSON.parse(fileContent);
        
        if (!Array.isArray(problemStatements)) {
            throw new Error('JSON file should contain an array of problem statements');
        }
        
        console.log(`📄 Loaded ${problemStatements.length} problem statements from ${filePath}`);
        return problemStatements;
        
    } catch (error) {
        console.error('❌ Error loading problem statements from file:', error);
        return [];
    }
}

// Main execution function
async function main() {
    try {
        await connectDB();

        // Load problem statements from the newPs.js file
        const psFilePath = path.join(__dirname, 'newPs.js');
        const problemStatements = loadProblemStatementsFromFile(psFilePath);

        if (problemStatements.length === 0) {
            console.log('❌ No problem statements to process');
            return;
        }

        // Process the problem statements
        const results = await processProblemStatements(problemStatements);

        // Print summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 PROCESSING SUMMARY');
        console.log('='.repeat(60));
        console.log(`Total processed: ${results.total}`);
        console.log(`✅ Created: ${results.created}`);
        console.log(`⏭️  Skipped (already exists): ${results.skipped}`);
        console.log(`❌ Failed: ${results.failed}`);
        console.log('='.repeat(60));

        // Print details for failed items
        if (results.failed > 0) {
            console.log('\n❌ FAILED ITEMS:');
            results.details
                .filter(r => r.action === 'error' || r.action === 'failed')
                .forEach(r => {
                    console.log(`- ${r.message}`);
                });
        }

        // Save results to a file
        const resultsFile = path.join(__dirname, `processing_results_${Date.now()}.json`);
        fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
        console.log(`📄 Detailed results saved to: ${resultsFile}`);

    } catch (error) {
        console.error('❌ Script execution error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Database connection closed');
        process.exit(0);
    }
}

// Function to process a single PS by ID (useful for testing)
async function processSinglePS(psId) {
    try {
        await connectDB();
        
        const psFilePath = path.join(__dirname, 'newPs.js');
        const problemStatements = loadProblemStatementsFromFile(psFilePath);
        
        const ps = problemStatements.find(p => p.id === psId);
        if (!ps) {
            console.log(`❌ Problem statement with ID ${psId} not found in file`);
            return;
        }

        const result = await processProblemStatement(ps);
        console.log('\n📊 RESULT:', result);
        
    } catch (error) {
        console.error('❌ Error processing single PS:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Database connection closed');
        process.exit(0);
    }
}

// Run the script based on command line arguments
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length > 0 && args[0] === '--single' && args[1]) {
        // Process single PS by ID
        console.log(`🎯 Processing single PS with ID: ${args[1]}`);
        processSinglePS(args[1]);
    } else {
        // Process all PSs
        main();
    }
}

// Export functions for use in other scripts
module.exports = {
    processProblemStatement,
    processProblemStatements,
    loadProblemStatementsFromFile,
    connectDB
};
