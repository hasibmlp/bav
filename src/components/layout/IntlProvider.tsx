import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'
import { AbstractIntlMessages } from 'next-intl'

type Props = {
  children: ReactNode
  locale: string
  messages: AbstractIntlMessages
}

export default function IntlProvider({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
