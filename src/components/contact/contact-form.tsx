'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="font-medium">Message sent</p>
        <p className="mt-1 text-sm text-zinc-300/80">
          Thanks — we’ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Name" name="name" required />
        <Input label="Email" name="email" type="email" required />
      </div>
      <Input label="Subject" name="subject" required />
      <Textarea label="Message" name="message" rows={6} required />
      <div className="pt-2">
        <Button type="submit">Send message</Button>
      </div>
      <p className="text-xs text-zinc-300/60">
        This is a demo form (no backend). Connect your email service or API
        route when ready.
      </p>
    </form>
  );
}

