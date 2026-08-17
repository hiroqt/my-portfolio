import { NextRequest, NextResponse } from 'next/server';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { checkRateLimit } from '@/lib/ai/rateLimit';

export const runtime = 'nodejs';

// ElevenLabs Default: "Adam" (Deep, authoritative American male voice for JARVIS)
const DEFAULT_ELEVENLABS_VOICE = 'pNInz6obpgDQGcFmaJgB';
const DEFAULT_EDGE_VOICE = 'en-US-BrianNeural';

/**
 * Synthesize speech via ElevenLabs REST API
 */
async function synthesizeWithElevenLabs(text: string, voiceId?: string): Promise<Buffer | null> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey || apiKey === 'your_elevenlabs_api_key_here') {
    return null;
  }

  try {
    // If voiceId is an Edge voice name (e.g. 'en-US-BrianNeural'), ignore it and use ELEVENLABS_VOICE_ID from env
    const isEdgeVoiceName = voiceId && (voiceId.includes('Neural') || voiceId.startsWith('en-'));
    const selectedVoice = (voiceId && !isEdgeVoiceName)
      ? voiceId
      : (process.env.ELEVENLABS_VOICE_ID || DEFAULT_ELEVENLABS_VOICE);

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}?optimize_streaming_latency=3&output_format=mp3_44100_128`;

    // Attempt with low-latency turbo model first
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    });

    // If turbo model is not available on this tier, fallback to multilingual_v2
    if (!res.ok && (res.status === 400 || res.status === 422)) {
      res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.0,
            use_speaker_boost: true
          }
        })
      });
    }

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      console.warn(`[ElevenLabs API warning]: HTTP ${res.status} - ${errBody}. Falling back to Edge Neural TTS.`);
      return null;
    }

    const arrayBuf = await res.arrayBuffer();
    console.log(`[ElevenLabs TTS Success]: Synthesized ${arrayBuf.byteLength} bytes using voice "${selectedVoice}"`);
    return Buffer.from(arrayBuf);
  } catch (err: any) {
    console.warn('[ElevenLabs Fetch Error]:', err.message);
    return null;
  }
}

/**
 * Synthesize speech via Edge Neural TTS
 */
async function synthesizeWithEdgeTTS(text: string, voice: string = DEFAULT_EDGE_VOICE, rate: string = '+2%', pitch: string = '+1Hz'): Promise<Buffer> {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  const streamResult = tts.toStream(text, {
    rate: rate || '+2%',
    pitch: pitch || '+1Hz'
  });

  const audioStream = streamResult.audioStream || (streamResult as any);
  const chunks: Buffer[] = [];

  await new Promise<void>((resolve, reject) => {
    audioStream.on('data', (chunk: Buffer) => chunks.push(chunk));
    audioStream.on('end', () => resolve());
    audioStream.on('error', (err: Error) => reject(err));
  });

  const audioBuffer = Buffer.concat(chunks);
  if (audioBuffer.length === 0) {
    throw new Error('Edge TTS returned empty audio buffer');
  }

  return audioBuffer;
}

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      '127.0.0.1';

    const rateResult = checkRateLimit(clientIp);
    if (!rateResult.success) {
      return NextResponse.json(
        { error: 'TTS Rate limit exceeded. Please wait a moment before requesting more voice responses.' },
        { status: 429 }
      );
    }

    const {
      text,
      voice,
      rate = '+2%',
      pitch = '+1Hz'
    } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Clean and naturalize text for expressive human-like speech
    let cleanText = text
      .replace(/[\uD83C-\uD83E][\uDC00-\uDFFF]|[\u2600-\u27BF]|[\u2300-\u23FF]|[\u2B50-\u2B55]/g, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/https?:\/\/\S+/gi, '')
      .replace(/\btech\s*stack\s*:\s*/gi, 'The tech stack includes ')
      .replace(/\bkey\s*(highlights|features)\s*:\s*/gi, 'Key highlights include ')
      .replace(/\b(project\s*name|slug|featured|abstract|category|tags|coursework|institution|institution\s*name)\s*:\s*/gi, '')
      .replace(/(^|\n|\.\s+)(project|summary|details)\s*:\s*/gi, '$1')
      .replace(/\((project|client project|hackathon entry|production|featured|lead architect & developer|486-hour internship)\)/gi, '')
      .replace(/\bGEAMH\b/g, 'G-E-A-M-H')
      .replace(/\bRAG\b/g, 'R-A-G')
      .replace(/\bHRIS\b/g, 'H-R-I-S')
      .replace(/\bSSO\b/g, 'S-S-O')
      .replace(/\bLLMs\b/gi, 'large language models')
      .replace(/\bLLM\b/gi, 'large language model')
      .replace(/\bB2B\b/gi, 'B to B')
      .replace(/\bQR\b/gi, 'Q-R')
      .replace(/(opening the project showcase for you|opening the project details for you|navigating to the projects section|navigating to the skills section|taking you to the skills breakdown|navigating to the experience timeline|navigating to the education section|navigating to verified certifications|opening the contact form for you now|opening the contact form)\.?/gi, '')
      .replace(/^\s*[-*•]\s+/gm, ', ')
      .replace(/[*_#~>\[\]\(\)]/g, '')
      .replace(/\s*,\s*,\s*/g, ', ')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      return NextResponse.json({ error: 'No valid text to speak' }, { status: 400 });
    }

    // 1. Attempt synthesis with ElevenLabs if API key is provided
    let engine = 'ElevenLabs';
    let audioBuffer = await synthesizeWithElevenLabs(cleanText, voice);

    // 2. Fallback to Microsoft Edge Neural TTS if ElevenLabs is not configured or failed
    if (!audioBuffer) {
      engine = 'EdgeNeural';
      audioBuffer = await synthesizeWithEdgeTTS(cleanText, voice || DEFAULT_EDGE_VOICE, rate, pitch);
    }

    return new NextResponse(new Uint8Array(audioBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(audioBuffer.length),
        'X-TTS-Engine': engine,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600'
      }
    });
  } catch (error: any) {
    console.error('[TTS API Synthesis Error]:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to synthesize speech' },
      { status: 500 }
    );
  }
}
