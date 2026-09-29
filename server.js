import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.GROQ_API_KEY;

if (!API_KEY) {
  console.warn('GROQ_API_KEY is not set in environment variables.');
}

const groq = new Groq({ apiKey: API_KEY || '' });

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, instruction } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const activeSystemPrompt = instruction || "Anda adalah AI Assistant yang ramah. Jawab dengan sopan dan ringkas.";

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: activeSystemPrompt },
        { role: 'user', content: prompt }
      ],
      model: 'openai/gpt-oss-20b',
    });
    
    const text = chatCompletion.choices[0]?.message?.content || 'Maaf, saya tidak bisa merespons saat ini.';
    
    res.json({ reply: text });
  } catch (error) {
    console.error('Error generating content:', error);
    const errorMessage = error?.message || 'Internal Server Error';
    res.status(500).json({ error: errorMessage, reply: `Pesan Sistem: ${errorMessage}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
