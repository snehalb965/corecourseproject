require('dotenv').config();
express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
router.post('/ask', async (req, res) => {
    const {query} = req.body;
    try{
        const  response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: query}],
        });
        const botReply = response.choices[0].message.content;
        res.json({reply: botReply});
    } catch (error) {
        res.status(500).json({error: 'Error processing your request', details : error.message});
    }
});
module.exports = router;
