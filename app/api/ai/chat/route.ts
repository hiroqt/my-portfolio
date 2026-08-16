import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/ai/rateLimit';
import { checkQuerySafety } from '@/lib/rag/grounding';
import { inferPersona, streamAgentResponse } from '@/lib/ai/agent';
import { ChatRequestPayload } from '@/lib/ai/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting by Client IP
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      '127.0.0.1';

    const rateResult = checkRateLimit(clientIp);
    if (!rateResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a few minutes before asking more questions.' },
        { status: 429 }
      );
    }

    // 2. Parse Payload
    let body: ChatRequestPayload;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    const { messages, uiContext, persona } = body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 });
    }

    const latestUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';

    // 3. Safety & Grounding Guardrail Check
    const safetyCheck = checkQuerySafety(latestUserMsg);
    if (!safetyCheck.isSafe) {
      return NextResponse.json({
        error: safetyCheck.refusalReason
      }, { status: 400 });
    }

    // 4. Infer Persona if not explicitly provided
    const selectedPersona = persona && persona !== 'default' ? persona : inferPersona(latestUserMsg);

    // 5. Create SSE Streaming Response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamAgentResponse(messages, selectedPersona, uiContext)) {
            const sseEvent = `data: ${JSON.stringify({ ...chunk, persona: selectedPersona })}\n\n`;
            controller.enqueue(encoder.encode(sseEvent));
          }
          controller.close();
        } catch (streamErr: any) {
          console.error('[SSE Stream Error]:', streamErr);
          const errorPayload = `data: ${JSON.stringify({ type: 'error', error: 'Stream error occurred.' })}\n\n`;
          controller.enqueue(encoder.encode(errorPayload));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no'
      }
    });
  } catch (error: any) {
    console.error('[API Route AI Chat Error]:', error);
    return NextResponse.json(
      { error: error?.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
