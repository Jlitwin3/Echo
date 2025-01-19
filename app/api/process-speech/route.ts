import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const speechFile = formData.get('speech') as File;

  if (!speechFile) {
    return NextResponse.json({ error: 'No speech file provided' }, { status: 400 });
  }

  try {
    // Save the incoming audio file
    const buffer = await speechFile.arrayBuffer();
    const filePath = path.join(process.cwd(), 'user_input.wav');
    await fs.writeFile(filePath, Buffer.from(buffer));

    // Run the Python script
    const { stdout, stderr } = await execAsync('bot2.py');

    if (stderr) {
      console.error('Python script error:', stderr);
      return NextResponse.json({ error: 'Error processing speech' }, { status: 500 });
    }

    // Read the generated output audio file
    const outputPath = path.join(process.cwd(), 'output.wav');
    const outputBuffer = await fs.readFile(outputPath);
    const base64Audio = outputBuffer.toString('base64');

    // Parse the stdout to get user speech and bot response
    const [userSpeech, botResponse] = stdout.split('\n').filter(line => line.includes(':')).map(line => line.split(':')[1].trim());

    return NextResponse.json({ userSpeech, botResponse, audioResponse: base64Audio });
  } catch (error) {
    console.error('Error processing speech:', error);
    return NextResponse.json({ error: 'Failed to process speech' }, { status: 500 });
  }
}

