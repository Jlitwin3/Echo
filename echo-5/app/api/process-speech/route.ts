import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const speechFile = formData.get('speech') as File;

  if (!speechFile) {
    return NextResponse.json({ error: 'No speech file provided' }, { status: 400 });
  }

  try {
    const flaskResponse = await fetch('http://localhost:5000/process', {
      method: 'POST',
      body: JSON.stringify({ speech: await speechFile.arrayBuffer() }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!flaskResponse.ok) {
      throw new Error('Flask server request failed');
    }

    const data = await flaskResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing speech:', error);
    return NextResponse.json({ error: 'Failed to process speech' }, { status: 500 });
  }
}

