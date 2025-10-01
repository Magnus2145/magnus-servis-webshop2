'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    await signIn('email', { email, redirect: false });
    setStatus('sent');
  };

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-primary">Admin prijava</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Unesite poslovni e-mail. Poslat ćemo vam jednokratnu prijavnu poveznicu (dev transport).
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Šaljemo...' : 'Pošalji prijavu'}
        </button>
      </form>
      {status === 'sent' && (
        <p className="mt-4 rounded-md bg-muted/60 p-3 text-sm text-muted-foreground">
          Provjerite konzolu servera za dev prijavnu poveznicu.
        </p>
      )}
    </div>
  );
}
