import { useState } from 'react';
import { site } from '../data/site';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Posts to /api/subscribe (Vercel serverless → Resend).
 *
 * If the endpoint is unavailable — not configured, 5xx, or the whole request
 * fails — we fall back to a prefilled mailto rather than swallowing the
 * enquiry. A contact form that silently loses messages is worse than no form.
 */
const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    'Project enquiry'
  )}&body=${encodeURIComponent(message || '')}`;

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('That email address does not look right.');
      return;
    }

    setState('sending');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), message: message.trim() }),
      });

      if (res.ok) {
        setState('sent');
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Could not send that right now.');
      setState('error');
    } catch {
      setError('Could not reach the server.');
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="border border-ink/15 bg-clay-wash p-8">
        <p className="font-display text-h3 tracking-tighter text-ink">Message sent.</p>
        <p className="mt-3 text-body text-ink-soft">
          It lands in my inbox directly — I'll reply to {email}.
        </p>
      </div>
    );
  }

  const field =
    'w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-body text-ink placeholder:text-ink-mute focus:border-clay focus:outline-none focus:ring-0 transition-colors duration-300';

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      <div>
        <label htmlFor="email" className="eyebrow block">
          Your email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={`${field} mt-3`}
          aria-describedby={error ? 'contact-error' : undefined}
          aria-invalid={Boolean(error)}
        />
      </div>

      <div>
        <label htmlFor="message" className="eyebrow block">
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A sentence on the problem, the constraints, and the timeline is plenty."
          className={`${field} mt-3 resize-none`}
        />
      </div>

      {error && (
        <p id="contact-error" role="alert" className="text-meta text-clay-deep">
          {error}{' '}
          <a href={mailtoHref} className="link">
            Email me directly instead
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <a href={mailtoHref} className="link font-mono text-meta uppercase tracking-[0.1em]">
          or use email
        </a>
      </div>
    </form>
  );
};

export default ContactForm;
