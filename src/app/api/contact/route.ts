// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'

// Minimal MVP: log to server; optionally send via SMTP if envs exist.
// Later you can replace this with Resend/SendGrid or Go function.

function hasSMTP() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_TO)
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as any

    // Honeypot
    if (typeof body.hp === 'string' && body.hp.trim() !== '') {
      return NextResponse.json({ ok: true })
    }

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    if (!hasSMTP()) {
      // MVP: just log on server
      console.log('CONTACT SUBMISSION', body)
      return NextResponse.json({ ok: true })
    }

    // If SMTP is configured, send mail (pseudo, you can wire nodemailer here)
    // Example with nodemailer (optional):
    // const transporter = nodemailer.createTransport({ host, port, auth, secure:false })
    // await transporter.sendMail({ from, to, subject, text/html })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
