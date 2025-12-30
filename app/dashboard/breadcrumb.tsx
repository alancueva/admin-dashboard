'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  administracion: 'Administrativo',
  catalogo: 'Catálogo',
  'gestion-de-existencia': 'Gestión de Existencia',
  'operaciones-comerciales': 'Operaciones Comerciales',
};

// Función para capitalizar y formatear los segmentos de la URL
const formatSegment = (segment: string) => {
  const lowerSegment = segment.toLowerCase();
  if (SEGMENT_LABELS[lowerSegment]) return SEGMENT_LABELS[lowerSegment];

  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function DashboardBreadcrumb() {
  const pathname = usePathname();
  // Filtra segmentos vacíos y aquellos que son solo números (IDs)
  const segments = pathname
    .split('/')
    .filter((segment) => segment && isNaN(Number(segment)));

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{formatSegment(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
