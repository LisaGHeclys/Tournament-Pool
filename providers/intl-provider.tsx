"use client";
import { NextIntlClientProvider, useLocale } from "next-intl";
import React from "react";

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  const [messages, setMessages] = React.useState<Record<string, any> | null>(
    null,
  );

  React.useEffect(() => {
    async function loadMessages() {
      const messages = (await import(`../dictionaries/${locale}.json`)).default;
      console.log(messages);
      console.log(locale);
      setMessages(messages);
    }
    loadMessages();
  }, [locale]);

  if (!messages) return null;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
