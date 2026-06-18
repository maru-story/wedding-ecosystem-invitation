import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * On-demand revalidation endpoint.
 * Called by CMS dashboard after saving section content.
 *
 * POST /api/revalidate
 * Body: { eventSlug: string, secret: string }
 *
 * This purges the ISR cache for the specific event page,
 * so the next visitor gets fresh data immediately.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventSlug, secret } = body

    // Validate secret to prevent unauthorized cache purges
    const expectedSecret = process.env.REVALIDATION_SECRET
    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid revalidation secret' },
        { status: 401 }
      )
    }

    if (!eventSlug) {
      return NextResponse.json(
        { error: 'eventSlug is required' },
        { status: 400 }
      )
    }

    // Revalidate the specific event page
    revalidatePath(`/${eventSlug}`)

    return NextResponse.json({
      revalidated: true,
      path: `/${eventSlug}`,
      timestamp: Date.now(),
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}
