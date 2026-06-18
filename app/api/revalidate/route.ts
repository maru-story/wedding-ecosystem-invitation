import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_ORIGINS = [
  'https://dashboard.maruplanner.my.id',
  'http://localhost:3000',
  'http://localhost:3002',
]

function corsHeaders(origin: string | null) {
  const allowedOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')
  return NextResponse.json({}, { headers: corsHeaders(origin) })
}

/**
 * On-demand revalidation endpoint.
 * Called by CMS dashboard after saving section content.
 *
 * POST /api/revalidate
 * Body: { eventSlug: string, secret: string }
 */
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')

  try {
    const body = await request.json()
    const { eventSlug, secret } = body

    // Validate secret to prevent unauthorized cache purges
    const expectedSecret = process.env.REVALIDATION_SECRET
    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid revalidation secret' },
        { status: 401, headers: corsHeaders(origin) }
      )
    }

    if (!eventSlug) {
      return NextResponse.json(
        { error: 'eventSlug is required' },
        { status: 400, headers: corsHeaders(origin) }
      )
    }

    // Revalidate the specific event page
    revalidatePath(`/${eventSlug}`)

    return NextResponse.json(
      {
        revalidated: true,
        path: `/${eventSlug}`,
        timestamp: Date.now(),
      },
      { headers: corsHeaders(origin) }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500, headers: corsHeaders(origin) }
    )
  }
}
