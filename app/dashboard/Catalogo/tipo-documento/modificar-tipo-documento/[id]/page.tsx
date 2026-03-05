'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftRight, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';

export default function RegistrarUnidadMedida() {
  const { id } = useParams();
  const vigencia: any[] = [
    { value: 'SI', label: 'SI' },
    { value: 'NO', label: 'NO' }
  ];
  return (
    <div>
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Modificar Tipo de Documento</CardTitle>
            <p>ID recibido: {id}</p>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
                <Check className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  grabar
                </span>
              </Button>

              <Link href="/dashboard/Catalogo/tipo-documento">
                <Button size="sm" className="h-8 gap-1">
                  <ArrowLeftRight className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Volver
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent>
          <form className="grid grid-cols-12 gap-4 mt-2">
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">
                Código Identificador
              </label>
              <Input
                type="text"
                placeholder="Código Identificador"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            {/* Nombre  */}
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">
                Nombre de Documento
              </label>
              <Input
                type="text"
                placeholder="Nombres de Documento"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">Abreviatura</label>
              <Input
                type="text"
                placeholder="Abreviatura"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="block mb-1 font-medium">
                Descripción de Documento
              </label>
              <Input
                type="text"
                placeholder="Descripción de Documento"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Longitud</label>
              <Input
                type="number"
                placeholder="Longitud"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">Vigencia</label>
              <select className="w-full border border-gray-300 rounded-md p-2">
                {/*<option value="">Seleccione</option>*/}
                {vigencia.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
