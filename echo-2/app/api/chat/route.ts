import { NextResponse } from 'next/server'
import { generateResponse } from '@/utils/aiClient'

export async function POST(request: Request) {
  const { message } = await request.json()
  
  try {
    const response = await generateResponse(message)
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error generating response:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}

