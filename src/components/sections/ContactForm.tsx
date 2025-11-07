'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true
    setResult(""); // Clear previous result
    const formData = new FormData(event.currentTarget);

    // Append access key
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult(t('thankYouMessage'));
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
    setIsLoading(false); // Set loading to false after submission
  };

  const t = useTranslations('ContactForm')
  const locale = useLocale()
  const tLang = useTranslations('LanguageSwitcher')
  const languageName = locale === 'en' ? tLang('english') : tLang('arabic')

  return (
    <div className="rounded-lg bg-white p-8 shadow-lg">
      <form onSubmit={onSubmit} className="space-y-6">
        <input type="hidden" name="language" value={languageName} />
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
            {t('fullName')}
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
            {t('emailAddress')}
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
            {t('subject')}
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
            {t('message')}
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
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t('sending')}
              </span>
            ) : (
              t('sendMessage')
            )}
          </button>
        </div>
        {result && <p className="text-center mt-4 text-sm font-medium text-neutral-700">{result}</p>}
      </form>
    </div>
  )
}
