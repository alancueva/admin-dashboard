import './globals.css';
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Stokontrol',
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
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
