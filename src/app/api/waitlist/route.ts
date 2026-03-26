import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(cleanEmail) || cleanEmail.length > 254) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // 1. Add contact to the Resend audience
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      await resend.contacts.create({
        email: cleanEmail,
        audienceId,
      }).catch(() => {
        // Contact may already exist — that's fine
      });
    }

    // 2. Send welcome confirmation email
    await resend.emails.send({
      from: 'ValorantScan <onboarding@resend.dev>',
      to: cleanEmail,
      subject: 'You\'re on the ValorantScan waitlist!',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; background: #0A141D; color: #ECE8E1; padding: 40px 32px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #FF4655, #BD3944); padding: 10px 16px; border-radius: 10px; margin-bottom: 16px;">
              <span style="font-weight: 800; color: white; font-size: 18px; letter-spacing: 1px;">VS</span>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">
              <span style="color: #ECE8E1;">VALORANT</span><span style="color: #FF4655;">SCAN</span>
            </h1>
          </div>

          <p style="font-size: 16px; line-height: 1.6; color: #ECE8E1; margin-bottom: 8px;">
            You're in. 🎯
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: rgba(236,232,225,0.6); margin-bottom: 24px;">
            Thanks for joining the ValorantScan waitlist. We're building the next generation of Valorant analytics — deep stat tracking, AI-powered insights, and tools designed for players who want to climb.
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: rgba(236,232,225,0.6); margin-bottom: 24px;">
            You'll be among the first to get access when we launch. We'll keep you posted on updates and early access opportunities.
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://valorantscan.com" style="display: inline-block; background: #FF4655; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; letter-spacing: 0.5px; text-transform: uppercase;">
              Visit ValorantScan
            </a>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; margin-top: 32px; text-align: center;">
            <a href="https://x.com/ValorantScan" style="color: rgba(236,232,225,0.4); text-decoration: none; font-size: 13px;">Follow us on X</a>
            <p style="font-size: 11px; color: rgba(236,232,225,0.2); margin-top: 12px;">
              Built by players, for players.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error instanceof Error ? error.message : 'Unknown');
    return NextResponse.json({ error: 'Failed to process signup' }, { status: 500 });
  }
}
