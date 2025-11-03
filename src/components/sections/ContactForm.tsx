'use client'

import { useState } from 'react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic (e.g., send to an API endpoint)
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
            Full Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md border-neutral-300 px-4 py-3 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
            Email Address
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md border-neutral-300 px-4 py-3 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-neutral-700">
            Subject
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="subject"
              id="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="block w-full rounded-md border-neutral-300 px-4 py-3 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
            Message
          </label>
          <div className="mt-1">
            <textarea
              name="message"
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="block w-full rounded-md border-neutral-300 px-4 py-3 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded-md px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}
