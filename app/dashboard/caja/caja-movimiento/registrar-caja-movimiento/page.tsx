'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftRight, Calendar, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import RegistroProductoForm from 'app/dashboard/inventario/productos/registrar-productos/page';

export default function RegistrarCajaMovimiento() {
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoMovimiento, setTipoMovimiento] = useState<'Ingreso' | 'Egreso'>(
    'Egreso'
  );

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showProductoDialog, setShowProductoDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGrabar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!monto || !descripcion) {
      alert('Por favor complete el monto y la descripción');
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleConfirm = (afectaInventario: boolean) => {
    setShowConfirmDialog(false);

    // Guardar movimiento de caja
    console.log({
      tipo: tipoMovimiento,
      monto: parseFloat(monto),
      descripcion,
      afectaInventario,
      fecha: new Date().toISOString()
    });

    if (afectaInventario) {
      setShowProductoDialog(true);
    } else {
      alert('Movimiento de caja registrado correctamente');
      // Aquí puedes redirigir o resetear el formulario
    }
  };

  const getPeruDateTimeLocal = () => {
    const now = new Date();
    const options = { timeZone: 'America/Lima' };

    const formatter = new Intl.DateTimeFormat('sv-SE', {
      // 'sv-SE' da formato YYYY-MM-DD
      ...options,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const parts = formatter.formatToParts(now);
    const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));

    return `${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}`;
  };
  return (
    <div>
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Registrar Caja Movimiento</CardTitle>

            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1" onClick={handleGrabar}>
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
                <Input
                  type="datetime-local"
                  defaultValue={getPeruDateTimeLocal()}
                  readOnly
                />
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
            <div className="col-span-12 md:col-span-2">
              <Label htmlFor="monto">Monto (S/)</Label>
              <Input
                id="monto"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div className="col-span-12 md:col-span-5"></div>
            <div className="col-span-12 md:col-span-12">
              <Label htmlFor="descripcion">Descripción / Concepto</Label>
              <Input
                type="text"
                placeholder="Descripción"
                className="w-full border border-gray-300 rounded-md p-2"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Diálogo de Confirmación - ¿Afecta Inventario? */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Esta compra afecta el inventario?
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Esta compra afecta el inventario de productos del restaurante?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
            <AlertDialogCancel
              onClick={() => handleConfirm(false)}
              className="w-full sm:w-auto"
            >
              No, es un gasto general
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => handleConfirm(true)}
              className="w-full sm:w-auto bg-primary"
            >
              Sí, estoy comprando productos
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo para Registrar Producto */}
      <Dialog open={showProductoDialog} onOpenChange={setShowProductoDialog}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registrar Nuevo Producto</DialogTitle>
          </DialogHeader>
          <RegistroProductoForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
