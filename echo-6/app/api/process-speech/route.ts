import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export async function POST() {
  try {
    // Run the Python script
    const { stdout, stderr } = await execAsync('python bot2-2.py');

    if (stderr) {
      console.error('Python script error:', stderr);
      return NextResponse.json({ error: 'Error processing speech' }, { status: 500 });
    }

    // Parse the stdout to get user speech and bot response
    const lines = stdout.split('\n');
    const userSpeech = lines.find(line => line.startsWith('Your speech:'))?.split(':')[1]?.trim() || '';
    const botResponse = lines.find(line => line.startsWith('Bot:'))?.split(':')[1]?.trim() || '';

    // Read the generated output audio file
    const outputPath = path.join(process.cwd(), 'output.wav');
    const outputBuffer = await fs.readFile(outputPath);
    const base64Audio = outputBuffer.toString('base64');

    return NextResponse.json({ userSpeech, botResponse, audioResponse: base64Audio });
  } catch (error) {
    console.error('Error processing speech:', error);
    return NextResponse.json({ error: 'Failed to process speech' }, { status: 500 });
  }
}

