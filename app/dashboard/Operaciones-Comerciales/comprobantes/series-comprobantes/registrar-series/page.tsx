'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Selected } from '@/components/ui/Select';
import { useState } from 'react';
import { Check, ArrowLeftRight } from 'lucide-react';
import Link from 'next/link';

/**
 * OPCIONES
 */
const tipo_comprobante_options = [
  { value: 1, label: 'Boleta' },
  { value: 2, label: 'Factura' }
];

const vigencia_options = [
  { value: 'SI', label: 'SI' },
  { value: 'NO', label: 'NO' }
];

export default function RegistrarSeriePage() {
  const [tipoComprobante, setTipoComprobante] = useState(null);
  const [vigencia, setVigencia] = useState(null);

  const tipoComprobanteChange = (value: any) => {
    setTipoComprobante(value);
  };

  const VigenciaChange = (value: any) => {
    setVigencia(value);
  };

  return (
    <div>
      {/* HEADER */}
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Registrar Series de Comprobante</CardTitle>

            <div className="ml-auto flex gap-2">
              <Button size="sm">
                <Check className="h-3.5 w-3.5" />
                Grabar
              </Button>

              <Link href="/dashboard/Operaciones-Comerciales/comprobantes/series-comprobantes">
                <Button size="sm">
                  <ArrowLeftRight className="h-3.5 w-3.5" />
                  Volver
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* FORM */}
      <Card>
        <CardContent>
          <form className="grid grid-cols-12 gap-4 mt-2">
            {/* TIPO COMPROBANTE */}
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">
                Tipo de Comprobante
              </label>
              <Selected
                value={tipoComprobante}
                onChange={tipoComprobanteChange}
                options={tipo_comprobante_options}
                placeholder="Seleccione"
              />
            </div>

            {/* SERIE */}
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">Serie</label>
              <Input type="text" placeholder="Ej: B001" maxLength={6} />
            </div>
            {/* PROXIMO (SOLO VISUAL) */}
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">Número</label>
              <Input type="text" value="Auto generado" disabled />
            </div>

            {/* DESCRIPCIÓN */}
            <div className="col-span-12 md:col-span-12">
              <label className="block mb-1 font-medium">Descripción</label>
              <Input type="text" placeholder="Ej: Boletas mostrador" />
            </div>

            {/* Vigencia */}
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Vigencia</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                disabled={true}
                defaultValue="SI"
              >
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </select>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
