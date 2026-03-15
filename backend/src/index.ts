import express from 'express';
import cors from 'cors';
import { Categories, Languages } from './data';

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.get('/api/languages', (req, res) => {
  res.json(Languages);
});

app.get('/api/categories', (req, res) => {
  res.json(Categories);
});

// Health check
app.get('/api/health', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Backend server starting on port ${port}...`);
});