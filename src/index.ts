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
    3. Prediction if the match hasnt happened yet, reflection on the result if it has.
  `;

  const response = await ai.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast' as any, {
    messages: [
      { role: 'system', content: 'You are a helpful football analyst. Do not hallucinate players who have left the clubs. If unsure about a player, focus on the manager\'s tactical system instead.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 4096
  }) as any;

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