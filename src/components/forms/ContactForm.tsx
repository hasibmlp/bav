// src/components/forms/ContactForm.tsx
'use client'
import { useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [error, setError] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading'); setError('')
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('ok')
      e.currentTarget.reset()
    } catch (err: any) {
      setStatus('error'); setError('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
      {/* honeypot */}
      <input type="text" name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm font-medium text-neutral-700">Name*</label>
          <input id="name" required name="name" className="block w-full rounded-md border border-neutral-300 px-3 py-3 focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
        </div>

        <div className="grid gap-1">
          <label htmlFor="company" className="text-sm font-medium text-neutral-700">Company*</label>
          <input id="company" required name="company" className="block w-full rounded-md border border-neutral-300 px-3 py-3 focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-1">
          <label htmlFor="email" className="text-sm font-medium text-neutral-700">Email*</label>
          <input id="email" required type="email" name="email" className="block w-full rounded-md border border-neutral-300 px-3 py-3 focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
        </div>

        <div className="grid gap-1">
          <label htmlFor="phone" className="text-sm font-medium text-neutral-700">Phone</label>
          <input id="phone" name="phone" className="block w-full rounded-md border border-neutral-300 px-3 py-3 focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
        </div>
      </div>

      <div className="grid gap-1">
        <label htmlFor="subject" className="text-sm font-medium text-neutral-700">Subject</label>
        <input id="subject" name="subject" className="block w-full rounded-md border border-neutral-300 px-3 py-3 focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
      </div>

      <div className="grid gap-1">
        <label htmlFor="message" className="text-sm font-medium text-neutral-700">Message*</label>
        <textarea id="message" required name="message" rows={6} className="block w-full rounded-md border border-neutral-300 px-3 py-3 focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="
            w-full inline-flex items-center justify-center rounded-md
            px-6 py-3 text-base font-medium
            text-white
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600
            transition-transform duration-200 motion-safe:hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          {status === 'loading' ? 'Sending…' : 'Send Message'}
        </button>
      </div>

      {status === 'ok' && <p className="text-green-600">Thanks! We’ll be in touch shortly.</p>}
      {status === 'error' && <p className="text-red-600">{error}</p>}
    </form>
  )
}
