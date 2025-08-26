const ProblemStatement = require('../models/ps.model');
const {analyzeProblemStatement} = require('./aiService');
const dbConnection = require('../database/connection');
const dotenv = require('dotenv');
dotenv.config();
dbConnection();

const fetchAndUpdate = async()=>{
    const allPS = await ProblemStatement.find();
    for(const ps of allPS){
        if(!ps.summary || !ps.tags || !ps.techStack || !ps.approach || ! difficultyLevel){
        const analysis = await analyzeProblemStatement(ps.description);
        const updatedPS = await ProblemStatement.findByIdAndUpdate(ps._id, {
            tags: analysis.data.tags,
            techStack: analysis.data.techStack,
            summary: analysis.data.summary,
            approach: analysis.data.approach,
            difficultyLevel: analysis.data.difficultyLevel
        }, { new: true });
        console.log(`Updated Problem Statement: ${updatedPS._id}`);
    }
    }
}

fetchAndUpdate();
