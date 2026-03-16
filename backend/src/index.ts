import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Categories, Languages } from './data';

const app = new Hono();

app.use('*', cors());

app.get('/api/languages', (c) => {
  return c.json(Languages);
});

app.get('/api/categories', (c) => {
  return c.json(Categories);
});

// Health check
app.get('/api/health', (c) => {
  return c.text('OK');
});

// For local development with Bun
if (process.env.NODE_ENV !== 'production' && !process.env.CF_PAGES) {
  console.log(`Backend server starting on port 8081...`);
  // @ts-ignore
  if (typeof Bun !== 'undefined') {
    // @ts-ignore
    Bun.serve({
      fetch: app.fetch,
      port: 8081,
    });
  }
}

export default app;
