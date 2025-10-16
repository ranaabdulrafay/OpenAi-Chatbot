import OpenAI from "openai";
import express from "express";

const app = express();
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
const PORT = 3000;


// Let Express read JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running!');
  });

app.get('/check', (req, res) => {
  res.send('Server is running!');
  res.json({ message: 'Server is running!', isRunning: true });
});

app.post('/ask', async (req, res) => {
  const received = req.body;
  console.log(`you asked ${received.input}`);
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: received.input
    });

  res.json({ message: 'Data received!', responseData: response.output_text });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});