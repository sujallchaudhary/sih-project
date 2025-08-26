const { PromptTemplate } = require('@langchain/core/prompts');

const problemStatementAnalyzerPrompt = PromptTemplate.fromTemplate(`
You are an AI assistant that analyzes problem statements and generates structured data for a project discovery platform.

Analyze the following problem statement and extract structured information:

Problem Statement: {problemStatement}

Guidelines:
- tags should be lowercase and concise
- techStack should only contain real technologies or methodologies, not abstract themes
- summary should be objective and not exceed 120 words  
- approach should break down the problem into logical solution steps
- difficultyLevel should be a single value from: easy, medium, hard

Extract the following information:
1. Tags: Descriptive keywords about the problem (themes, domain, purpose)
2. Tech Stack: Actual technologies, programming languages, frameworks, or methods
3. Summary: Short, clear summary describing the problem and expected solution
4. Approach: Ordered list of steps to solve the problem
5. Difficulty Level: Assessment based on technical complexity and resource needs

Respond with structured data only.
`);

module.exports = {
    problemStatementAnalyzerPrompt
};
