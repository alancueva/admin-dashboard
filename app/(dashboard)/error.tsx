'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>¡Ups! Algo salió mal</CardTitle>
          <CardDescription>
            Se ha producido un error inesperado. Puedes intentar recargar la
            página o volver al inicio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* En desarrollo, es útil mostrar el mensaje de error. En producción, podrías ocultarlo. */}
          <pre className="text-xs text-destructive bg-red-50 dark:bg-red-950 p-2 rounded-md overflow-auto">
            {error.message}
          </pre>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link href="/">
            <Button variant="outline">Ir al Inicio</Button>
          </Link>
          <Button onClick={() => reset()}>Intentar de nuevo</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
