import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider
          locale={params.locale}
          messages={{}} // temporär leer zum Testen
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
