const { problemStatementAnalyzerPrompt } = require("../prompts/problemStatementAnalyzer");
const { getGoogleGemini } = require("../llms/providers/gemini");
const { z } = require("zod");

const problemStatementSchema = z.object({
    tags: z.array(z.string()).describe("Array of descriptive keywords about the problem (themes, domain, purpose)"),
    techStack: z.array(z.string()).describe("Array of actual technologies, programming languages, frameworks, or methods that could be used to solve it"),
    summary: z.string().describe("A short, clear summary (3-4 sentences) describing the problem and the expected solution"),
    approach: z.array(z.string()).describe("An ordered list of steps explaining how to approach solving the problem"),
    difficultyLevel: z.enum(["easy", "medium", "hard"]).describe("Difficulty level based on technical complexity, resource needs, and interdisciplinary requirements")
});

const llm = getGoogleGemini('analysis_tasks', 0.7).withStructuredOutput(problemStatementSchema).withConfig({
    thinkingConfig: { thinkingBudget: 0 }
  });

const problemAnalyzerChain = problemStatementAnalyzerPrompt.pipe(llm);

async function analyzeProblemStatement(problemStatement) {
    try {
        const response = await problemAnalyzerChain.invoke({
            problemStatement: problemStatement
        });
        return {
            success: true,
            data: response,
            message: "Problem statement analyzed successfully"
        };
    } catch (error) {
        console.error("Error in analyzeProblemStatement:", error);
        return {
            success: false,
            error: error.message,
            data: null,
            message: "Failed to analyze problem statement"
        };
    }
}

module.exports = {
    analyzeProblemStatement,
};