'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';
import { Selected } from '@/components/ui/Selected';

interface Option {
  value: string | number;
  label: string;
}

interface Producto {
  id: number;
  numero_serie: string;
  nombre: string;
  controla_stock: boolean;
  stock_actual?: number | null;
}

const productosEjemplo: Producto[] = [
  {
    id: 1,
    numero_serie: 'LOMO-000001',
    nombre: 'Lomo Saltado',
    controla_stock: false
  },
  {
    id: 2,
    numero_serie: 'INKA-000002',
    nombre: 'Inca Kola',
    controla_stock: true,
    stock_actual: 45
  },
  {
    id: 3,
    numero_serie: 'ARROZ-000003',
    nombre: 'Arroz con Pollo',
    controla_stock: false
  },
  {
    id: 4,
    numero_serie: 'COCA-000004',
    nombre: 'Coca Cola 500ml',
    controla_stock: true,
    stock_actual: 120
  }
];

export default function RegistroMovimientoForm() {
  // Estados principales
  const [tipoMovimiento, setTipoMovimiento] = useState<
    'ENTRADA' | 'SALIDA' | 'AJUSTE'
  >('ENTRADA');
  const [selectedProducto, setSelectedProducto] = useState<Option | null>(null);
  const [cantidad, setCantidad] = useState<number | ''>('');
  const [costoUnitario, setCostoUnitario] = useState<number | ''>('');
  const [descripcion, setDescripcion] = useState('');
  const [referencia, setReferencia] = useState('');

  // Fecha actual formateada (solo lectura)
  const fechaActual = new Date().toLocaleString('es-PE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  // Producto seleccionado completo
  const productoActual = productosEjemplo.find(
    (p) => p.id === selectedProducto?.value
  );

  // Cálculo automático del monto total
  const montoTotal = Number(cantidad) * Number(costoUnitario) || 0;

  // Validación
  const puedeRegistrar = () => {
    if (!selectedProducto || !cantidad) return false;
    if (!productoActual?.controla_stock && tipoMovimiento !== 'AJUSTE') {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!puedeRegistrar()) {
      alert(
        'Por favor completa todos los campos requeridos y verifica las reglas de stock.'
      );
      return;
    }

    const movimientoData = {
      fecha_movimientos: new Date().toISOString(), // Fecha actual
      tipo_movimientos: tipoMovimiento,
      id_productos: selectedProducto?.value,
      cantidad: Number(cantidad),
      costo_unitario: costoUnitario ? Number(costoUnitario) : null,
      monto_total: montoTotal,
      descripcion: descripcion.trim(),
      referencia: referencia.trim(),
      id_usuario: 1, // ← Cambiar por el ID del usuario logueado
      id_caja_arqueo: null, // ← Puedes poner el ID de caja si está abierta
      id_referencia: null // Opcional: puedes usar referencia como ID externo
    };

    console.log('Movimiento a guardar:', movimientoData);

    // Aquí harás la llamada a tu API (fetch o axios)
    // Ejemplo:
    // await fetch('/api/movimientos', { method: 'POST', body: JSON.stringify(movimientoData) });

    alert('Movimiento registrado correctamente (simulación)');
  };

  return (
    <div className="space-y-6">
      <Card className="sticky top-0 z-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Registrar Movimiento de Inventario</CardTitle>
            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                size="sm"
                className="h-9 gap-2"
                disabled={!puedeRegistrar()}
              >
                <Save className="h-4 w-4" />
                Grabar
              </Button>
              <Link href="/dashboard/inventario/movimientos_inventario">
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
            {/* Fecha del Movimiento - Nueva */}
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="fecha">Fecha del Movimiento</Label>
              <Input
                id="fecha"
                value={fechaActual}
                className="mt-1 bg-gray-100 text-gray-700 font-medium cursor-not-allowed"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">
                Fecha y hora actual (no editable)
              </p>
            </div>
            {/* Tipo de Movimiento */}
            <div className="col-span-12 md:col-span-3">
              <Label htmlFor="tipo">Tipo de Movimiento *</Label>
              <select
                id="tipo"
                value={tipoMovimiento}
                onChange={(e) =>
                  setTipoMovimiento(
                    e.target.value as 'ENTRADA' | 'SALIDA' | 'AJUSTE'
                  )
                }
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              >
                <option value="ENTRADA">Entrada (Compra / Ingreso)</option>
                <option value="SALIDA">Salida (Venta / Consumo)</option>
                <option value="AJUSTE">Ajuste de Inventario</option>
              </select>
            </div>

            {/* Producto con react-select */}
            <div className="col-span-12 md:col-span-5">
              <Label htmlFor="producto">Producto *</Label>
              <Selected
                value={selectedProducto}
                onChange={(value) => setSelectedProducto(value as any)}
                options={productosEjemplo.map((p) => ({
                  value: p.id,
                  label: `${p.numero_serie} - ${p.nombre}`
                }))}
                placeholder="Busca y selecciona un producto..."
              />
              {productoActual && !productoActual.controla_stock && (
                <p className="text-amber-600 text-sm mt-1">
                  ⚠️ Este producto <strong>no controla stock</strong>. Solo se
                  permiten Ajustes.
                </p>
              )}
            </div>

            {/* Cantidad */}
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="cantidad">
                Cantidad{' '}
                {tipoMovimiento === 'SALIDA' ? '(Salida)' : '(Entrada)'} *
              </Label>
              <Input
                id="cantidad"
                type="number"
                value={cantidad}
                onChange={(e) =>
                  setCantidad(e.target.value ? Number(e.target.value) : '')
                }
                placeholder="0"
                className="mt-1"
              />
            </div>

            {/* Costo Unitario */}
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="costo">Costo Unitario (S/)</Label>
              <Input
                id="costo"
                type="number"
                step="0.01"
                value={costoUnitario}
                onChange={(e) =>
                  setCostoUnitario(e.target.value ? Number(e.target.value) : '')
                }
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            {/* Monto Total */}
            <div className="col-span-12 md:col-span-4">
              <Label>Monto Total</Label>
              <Input
                value={`S/ ${montoTotal.toFixed(2)}`}
                className="mt-1 bg-gray-50 font-medium"
                readOnly
              />
            </div>

            {/* Referencia */}
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="referencia">Referencia / Documento</Label>
              <Input
                id="referencia"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                placeholder="Ej: COMP-20260428-005, VENTA-MESA-12"
                className="mt-1"
              />
            </div>

            {/* Descripción */}
            <div className="col-span-12">
              <Label htmlFor="descripcion">Descripción / Motivo</Label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ej: Compra a proveedor, Venta en mesa 3, Ajuste por merma..."
                rows={3}
                className="mt-1"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
