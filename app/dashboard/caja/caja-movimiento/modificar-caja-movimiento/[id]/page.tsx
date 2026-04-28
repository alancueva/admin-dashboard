'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftRight, Calendar, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ModificarCajaMovimiento() {
  return (
    <div>
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Modificar Caja Movimiento (Ver Registro)</CardTitle>

            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
                <Check className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  grabar
                </span>
              </Button>

              <Link href="/dashboard/caja/caja-movimiento">
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
            <div className="col-span-12 md:col-span-3">
              <label className="block mb-1 font-medium">Fecha Movimiento</label>
              <div className="relative">
                <Input type="datetime-local" readOnly />
                <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Estado</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                disabled={true}
                defaultValue="Egreso"
              >
                <option value="Ingreso">Ingreso</option>
                <option value="Egreso">Egreso</option>
              </select>
            </div>
            {/*<div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Caja</label>
              <Input type="number" readOnly placeholder="0.00" />
            </div>*/}
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Monto</label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div className="col-span-12 md:col-span-5"></div>
            <div className="col-span-12 md:col-span-12">
              <label className="block mb-1 font-medium">Observación</label>
              <Input
                type="text"
                placeholder="Observación"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
