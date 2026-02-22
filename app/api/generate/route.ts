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

    const prompt = `Create an absurd and HILARIOUS startup idea based on the word "${word}". Make it funny but take it completely seriously like a real VC pitch. Be creative and unexpected!
    
Format your response as JSON (no markdown, just valid JSON):
{
  "name": "Funny startup name like 'Uber for X' or 'Netflix of Y' - be creative and unexpected (2-4 words)",
  "tagline": "One witty tagline that's 8-12 words, clever and funny",
  "description": "A 3-4 sentence absurd but detailed business pitch. Describe the problem, solution, and target market in the most ridiculous but serious way possible. Make it funny!",
  "funding": "A hilariously large or small funding prediction like '$420M Series Z' or '$3 Seed Round'",
  "logo": "A single emoji that perfectly represents this absurd startup"
}

Key: Make it FUNNY and absurd but write it like a serious business pitch. The contrast is what makes it hilarious. Be specific and creative!`;

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
