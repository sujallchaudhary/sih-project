const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const dotenv = require('dotenv');
dotenv.config();

function getGoogleGemini() {
    const config = {
        model: "gemini-2.5-flash-lite",
    };
    
    return new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        model: config.model,
        });
}

module.exports = {
    getGoogleGemini
};
