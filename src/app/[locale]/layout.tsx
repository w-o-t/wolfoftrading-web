import '../globals.css';
import {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';

export default function LocaleLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html>
      <body>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
