import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

// Lightweight daily ping to keep Supabase free tier from auto-pausing.
// Called by Vercel cron at 12:00 UTC every day.

export async function GET() {
  try {
    const supabase = createServerClient()
    const { error } = await supabase
      .from('city_indices')
      .select('id')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error

    return NextResponse.json({ ok: true, ts: new Date().toISOString() })
  } catch (err) {
    console.error('[ping-db]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
