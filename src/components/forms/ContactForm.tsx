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

      <div className="grid gap-1">
        <label>Name*</label>
        <input required name="name" className="border rounded p-2" />
      </div>

      <div className="grid gap-1">
        <label>Company*</label>
        <input required name="company" className="border rounded p-2" />
      </div>

      <div className="grid gap-1">
        <label>Email*</label>
        <input required type="email" name="email" className="border rounded p-2" />
      </div>

      <div className="grid gap-1">
        <label>Phone</label>
        <input name="phone" className="border rounded p-2" />
      </div>

      <div className="grid gap-1">
        <label>Subject</label>
        <input name="subject" className="border rounded p-2" />
      </div>

      <div className="grid gap-1">
        <label>Message*</label>
        <textarea required name="message" rows={6} className="border rounded p-2" />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>

      {status === 'ok' && <p className="text-green-600">Thanks! We’ll be in touch shortly.</p>}
      {status === 'error' && <p className="text-red-600">{error}</p>}
    </form>
  )
}
