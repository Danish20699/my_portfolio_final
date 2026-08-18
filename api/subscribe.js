/**
 * POST /api/subscribe
 *
 * Vercel serverless function. Takes an email address from the contact form
 * and emails it to you via Resend, so enquiries land in your inbox instead
 * of depending on the visitor having a mail client configured.
 *
 * Required environment variable (set in the Vercel dashboard):
 *   RESEND_API_KEY   - from https://resend.com/api-keys
 *
 * Optional:
 *   MAIL_TO          - where enquiries are delivered (defaults below)
 *   MAIL_FROM        - sender. Resend's shared "onboarding@resend.dev" works
 *                      with no domain setup, but can ONLY deliver to the
 *                      address your Resend account was registered with.
 *                      Once you verify a domain, set this to it.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254; // RFC 5321
const MAX_MESSAGE_LENGTH = 2000;

const escapeHtml = str =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Never leak configuration detail to the client.
    console.error('[subscribe] RESEND_API_KEY is not set');
    return res.status(503).json({ error: 'Email is not set up yet — please use the address below.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const email = String(body?.email ?? '').trim();
  const message = String(body?.message ?? '').trim().slice(0, MAX_MESSAGE_LENGTH);

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  // Belt and braces: newlines in an address are the classic header-injection
  // vector. EMAIL_PATTERN already rejects whitespace, so this should be
  // unreachable — it stays because the cost of being wrong is high.
  if (/[\r\n]/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const to = process.env.MAIL_TO || 'danishpersonal6@gmail.com';
  const from = process.env.MAIL_FROM || 'Portfolio <onboarding@resend.dev>';

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry from ${email}`,
        text: [
          'New enquiry from the portfolio contact form.',
          '',
          `Email:   ${email}`,
          message ? `\nMessage:\n${message}` : '',
          '',
          'Reply directly to this email to reach them.'
        ].join('\n'),
        html: [
          '<h2 style="margin:0 0 12px">New portfolio enquiry</h2>',
          `<p style="margin:0 0 8px"><strong>Email:</strong> `,
          `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
          message ? `<p style="margin:0 0 8px"><strong>Message:</strong><br>${escapeHtml(message)}</p>` : '',
          '<p style="margin:16px 0 0;color:#666;font-size:13px">Reply directly to this email to reach them.</p>'
        ].join('')
      })
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text();
      console.error('[subscribe] Resend rejected the request:', resendResponse.status, detail);
      return res.status(502).json({ error: "Couldn't send that right now — please use the address below." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[subscribe] Unexpected failure:', err);
    return res.status(500).json({ error: "Couldn't send that right now — please use the address below." });
  }
}
