'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Selected } from '@/components/ui/Select';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Plus, Trash, Check } from 'lucide-react';

/**
 * MOCK MENU (productos)
 */
const menu_items = [
  { value: 1, label: 'Hamburguesa', precio: 15 },
  { value: 2, label: 'Pizza', precio: 25 },
  { value: 3, label: 'Gaseosa', precio: 5 }
];

const metodo_pago_options = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'tarjeta', label: 'Tarjeta' },
  { value: 'transferencia', label: 'Transferencia' }
];

/**
 * DETALLE
 */
interface DetalleVenta {
  id: number;
  menu_id: number;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export default function RegistrarVentaPage() {
  const [detalles, setDetalles] = useState<DetalleVenta[]>([]);
  const [producto, setProducto] = useState<any>(null);
  const [cantidad, setCantidad] = useState(1);

  const [metodoPago, setMetodoPago] = useState<any>(null);
  const [montoRecibido, setMontoRecibido] = useState(0);
  const [descuento, setDescuento] = useState(0);

  /**
   * ➕ AGREGAR PRODUCTO
   */
  const agregarDetalle = () => {
    if (!producto) return;

    const subtotal = producto.precio * cantidad;

    const nuevo: DetalleVenta = {
      id: Date.now(),
      menu_id: producto.value,
      nombre: producto.label,
      cantidad,
      precio_unitario: producto.precio,
      subtotal
    };

    setDetalles([...detalles, nuevo]);
  };

  /**
   * ❌ ELIMINAR
   */
  const eliminar = (id: number) => {
    setDetalles(detalles.filter((d) => d.id !== id));
  };

  /**
   * 💰 TOTALES
   */
  const totalPedido = detalles.reduce((acc, d) => acc + d.subtotal, 0);
  const totalFinal = totalPedido - descuento;
  const cambio = montoRecibido - totalFinal;

  /**
   * 🧾 COLUMNAS
   */
  const columnas = [
    {
      name: 'Producto',
      selector: (row: DetalleVenta) => row.nombre
    },
    {
      name: 'Cantidad',
      selector: (row: DetalleVenta) => row.cantidad
    },
    {
      name: 'P. Unitario',
      selector: (row: DetalleVenta) => `S/ ${row.precio_unitario}`
    },
    {
      name: 'Subtotal',
      selector: (row: DetalleVenta) => `S/ ${row.subtotal}`
    },
    {
      name: 'Acciones',
      cell: (row: DetalleVenta) => (
        <Button
          size="icon"
          variant="destructive"
          onClick={() => eliminar(row.id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )
    }
  ];

  return (
    <div>
      {/* HEADER */}
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Registrar Venta</CardTitle>

            <div className="ml-auto">
              <Button size="sm">
                <Check className="h-4 w-4 mr-1" />
                Guardar Venta
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* FORM CABECERA */}
      <Card>
        <CardContent className="grid grid-cols-12 gap-4 mt-2">
          <div className="col-span-12 md:col-span-3">
            <label>Método de Pago</label>
            <Selected
              value={metodoPago}
              onChange={setMetodoPago}
              options={metodo_pago_options}
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <label>Descuento</label>
            <Input
              type="number"
              value={descuento}
              onChange={(e) => setDescuento(Number(e.target.value))}
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <label>Total Recibido</label>
            <Input
              type="number"
              value={montoRecibido}
              onChange={(e) => setMontoRecibido(Number(e.target.value))}
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <label>Cambio</label>
            <Input value={cambio.toFixed(2)} disabled />
          </div>
        </CardContent>
      </Card>

      {/* AGREGAR PRODUCTOS */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Agregar Productos</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <label>Producto</label>
            <Selected
              value={producto}
              onChange={setProducto}
              options={menu_items}
            />
          </div>

          <div className="col-span-12 md:col-span-2">
            <label>Cantidad</label>
            <Input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
            />
          </div>

          <div className="col-span-12 md:col-span-2 flex items-end">
            <Button onClick={agregarDetalle}>
              <Plus className="h-4 w-4 mr-1" />
              Agregar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* DETALLE */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Detalle de Venta</CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columnas}
            data={detalles}
            noDataComponent="No hay productos"
          />
        </CardContent>
      </Card>

      {/* TOTALES */}
      <Card className="mt-4">
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <label>Total Pedido</label>
            <Input value={`S/ ${totalPedido.toFixed(2)}`} disabled />
          </div>

          <div className="col-span-12 md:col-span-4">
            <label>Total Final</label>
            <Input value={`S/ ${totalFinal.toFixed(2)}`} disabled />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
