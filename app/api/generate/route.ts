import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { word } = await request.json();

    if (!word || typeof word !== 'string') {
      return NextResponse.json(
        { error: 'Word is required' },
        { status: 400 }
      );
    }

    const prompt = `Create an absurd and funny startup idea based on the word "${word}". 
    
Format your response as JSON with the following structure (no markdown, just valid JSON):
{
  "name": "A funny startup name (2-3 words, like 'Uber for X' style)",
  "tagline": "A one-line funny tagline (max 10 words)",
  "description": "A 2-3 sentence absurd business description that takes the idea seriously",
  "funding": "A funny funding amount prediction (e.g., '$50M Series A')",
  "logo": "A single emoji that represents the startup"
}

Make it hilarious but coherent. The idea should be absurd but described seriously like a real pitch.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    // Parse JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON response');
    }

    const idea = JSON.parse(jsonMatch[0]);

    return NextResponse.json(idea);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate idea' },
      { status: 500 }
    );
  }
}
