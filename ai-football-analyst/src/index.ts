import { Hono } from 'hono';
import { Ai } from '@cloudflare/ai';

type Bindings = {
  AI: any;
  FOOTBALL_KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post('/api/analyze', async (c) => {
  const ai = new Ai(c.env.AI);
  const body = await c.req.json();
  const { homeTeam, awayTeam, competition, notes } = body;

  const prompt = `
    Act as an expert football analyst. Analyze the match: ${homeTeam} vs ${awayTeam}.
    Competition: ${competition || 'General'}.
    Context: ${notes || 'None'}.
    
    Provide:
    1. Scouting report.
    2. 3 Tactical keys.
    3. Prediction.
  `;

  // Using Llama 3.3 as requested in the assignment
  // If this specific ID fails, fallback to "@cf/meta/llama-3.1-8b-instruct"
  const response = await ai.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast' as any, {
    messages: [{ role: 'user', content: prompt }],
  }) as any;

  // Save state to KV (Satisfies "Memory" requirement)
  const key = `${Date.now()}-${homeTeam}-vs-${awayTeam}`;
  await c.env.FOOTBALL_KV.put(key, JSON.stringify({ 
    input: body, 
    analysis: response.response 
  }));

  return c.json({ 
    key, 
    analysis: response.response 
  });
});

import htmlContent from '../frontend/index.html';
app.get('/', (c) => c.html(htmlContent));

export default app;