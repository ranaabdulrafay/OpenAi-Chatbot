import OpenAI from "openai";
import express from "express";

const app = express();
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
let lastRequestTime = 0;
const minInterval = 1500;
// Let Express read JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('OpenAI chatBot service by abdul rafay rana is running!');
  });

app.get('/check', (req, res) => {
  res.send('Server is running!');
  res.json({ message: 'Server is running!', isRunning: true });
});

app.post('/ask', async (req, res) => {
  const received = req.body;
  console.log(`you asked ${received.input}`);
  if(received.input > 500)
    res.json({ message: 'Data received!', responseData: "Hey! Its a Demo so lets stick to small talk lets say 500 characters."});

  const now = Date.now();
  if (now - lastRequestTime < minInterval) {
    return res.json({ reply: "Slow down , You're gonna hit my limit." });
  }
  lastRequestTime = now;

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: "You are Elara, a kind and curious companion NPC. Keep replies short and funny."
      },
      {
        role: "user",
        content: received.input
      }
    ],
    max_output_tokens: 200
    });

  res.json({ message: 'Data received!', responseData: response.output[0]?.content[0]?.text || "…" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running...`);
});
