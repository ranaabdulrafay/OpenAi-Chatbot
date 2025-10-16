import OpenAI from "openai";
import express from "express";

const app = express();
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

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
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: received.input
    });

  res.json({ responseData: response.output_text });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running...`);
});
