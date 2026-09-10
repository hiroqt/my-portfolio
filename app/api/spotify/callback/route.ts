import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;padding:40px;background:#0c0e18;color:#fff;">
        <h2 style="color:#ef4444;">Spotify Authorization Error</h2>
        <p>${error}</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  if (!code) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;padding:40px;background:#0c0e18;color:#fff;">
        <h2>No code found in request</h2>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;padding:40px;background:#0c0e18;color:#fff;">
        <h2 style="color:#ef4444;">Missing Client Credentials</h2>
        <p>Ensure SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are set in .env.local</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    const redirectUri = `${request.nextUrl.origin}/api/spotify/callback`

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
      cache: 'no-store',
    })

    const data = await response.json()

    if (!response.ok || !data.refresh_token) {
      return new NextResponse(
        `<html><body style="font-family:sans-serif;padding:40px;background:#0c0e18;color:#fff;">
          <h2 style="color:#ef4444;">Token Exchange Failed</h2>
          <pre style="background:#1e293b;padding:20px;border-radius:8px;">${JSON.stringify(data, null, 2)}</pre>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      )
    }

    const refreshToken = data.refresh_token

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Spotify Token Generated</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0c0e18; color: #fff; padding: 40px 20px; display: flex; justify-content: center; }
          .card { max-width: 650px; width: 100%; background: #121624; border: 1px solid rgba(255,255,255,0.15); border-radius: 18px; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
          h2 { color: #1DB954; margin-top: 0; display: flex; align-items: center; gap: 8px; }
          .token-box { background: #07090e; padding: 16px; border-radius: 10px; font-family: monospace; font-size: 14px; word-break: break-all; border: 1px solid rgba(255,255,255,0.2); color: #38bdf8; margin: 16px 0; }
          .btn { background: #1DB954; color: #000; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 14px; transition: opacity 0.2s; }
          .btn:hover { opacity: 0.9; }
          .steps { margin-top: 24px; font-size: 14px; line-height: 1.6; color: #94a3b8; }
          .steps li { margin-bottom: 8px; }
          code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #fff; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2><span>✓</span> Spotify Token Generated!</h2>
          <p style="color: #cbd5e1;">Copy your permanent refresh token below:</p>
          <div class="token-box" id="token">${refreshToken}</div>
          <button class="btn" onclick="navigator.clipboard.writeText('${refreshToken}'); this.innerText='Copied to Clipboard!';">Copy Refresh Token</button>

          <div class="steps">
            <h4 style="color:#fff;margin-bottom:8px;">Next Steps for Production:</h4>
            <ol>
              <li>Paste this into your <code>.env.local</code> as:
                <br><code>SPOTIFY_REFRESH_TOKEN=${refreshToken}</code>
              </li>
              <li>Add the following 3 variables to <strong>Vercel Project Settings &rarr; Environment Variables</strong>:
                <ul>
                  <li><code>SPOTIFY_CLIENT_ID</code></li>
                  <li><code>SPOTIFY_CLIENT_SECRET</code></li>
                  <li><code>SPOTIFY_REFRESH_TOKEN</code></li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  } catch (err: any) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;padding:40px;background:#0c0e18;color:#fff;">
        <h2 style="color:#ef4444;">Server Error</h2>
        <p>${err.message}</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}
