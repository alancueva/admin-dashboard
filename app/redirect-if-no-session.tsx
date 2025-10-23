'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function RedirectIfNoSession() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // No redirigir si ya estamos en /login
    if (pathname === '/login') return;

    const session = localStorage.getItem('session');
    if (!session) router.replace('/login');
  }, [pathname, router]);

  return null;
}
