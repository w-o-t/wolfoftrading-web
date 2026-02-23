import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <NextIntlClientProvider
      locale={params.locale}
      messages={{}}
    >
      {children}
    </NextIntlClientProvider>
  );
}
