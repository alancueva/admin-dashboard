import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import RedirectIfNoSession from './redirect-if-no-session';

export const metadata = {
  title: 'Control de Stock',
  description:
    'Administra tus productos y controla el stock de manera eficiente.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex min-h-screen w-full flex-col">
        <RedirectIfNoSession/>
        {children}
      </body>
      <Analytics />
    </html>
  );
}
