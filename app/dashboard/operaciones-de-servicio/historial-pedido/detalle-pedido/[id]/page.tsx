'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftRight, Check, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useParams } from 'next/navigation';
/* =======================
   INTERFACE DETALLE
======================= */
interface DetallePedido {
  id: number;
  menu_id: number;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  notas?: string;
  estado: string;
}

export default function RegistrarPedido() {
  const { id } = useParams();
  const [detalles, setDetalles] = useState<DetallePedido[]>([]);
  /* =======================
      AGREGAR ITEM
   ======================= */
  const agregarItem = () => {
    const nuevo: DetallePedido = {
      id: Date.now(),
      menu_id: 0,
      nombre: '',
      cantidad: 1,
      precio_unitario: 0,
      subtotal: 0,
      estado: 'pendiente'
    };

    setDetalles([...detalles, nuevo]);
  };
  /* =======================
      ELIMINAR ITEM
   ======================= */
  const eliminarItem = (id: number) => {
    setDetalles(detalles.filter((d) => d.id !== id));
  };

  /* =======================
        ACTUALIZAR ITEM
     ======================= */
  const actualizarItem = (id: number, campo: string, valor: any) => {
    const nuevos = detalles.map((item) => {
      if (item.id === id) {
        const actualizado = { ...item, [campo]: valor };

        // recalcular subtotal
        actualizado.subtotal =
          actualizado.cantidad * actualizado.precio_unitario;

        return actualizado;
      }
      return item;
    });

    setDetalles(nuevos);
  };

  /* =======================
        TOTALES
     ======================= */
  const subtotalGeneral = detalles.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );
  return (
    <div className="p-0 overflow-hidden">
      {/* HEADER */}
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Detalle Pedido</CardTitle>
            <p>ID recibido: {id}</p>
            <div className="ml-auto flex items-center gap-2">
              {/*<Button size="sm" className="h-8 gap-1">
                <Check className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Guardar
                </span>
              </Button>*/}

              <Link href="/dashboard/operaciones-de-servicio/historial-pedido">
                <Button size="sm" className="h-8 gap-1">
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
            {/*<div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Código de Pedido</label>
              <Input
                type="number"
                placeholder="0"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>*/}
            {/* FECHA APERTURA */}
            <div className="col-span-12 md:col-span-3">
              <label className="block mb-1 font-medium">Fecha Pedido</label>
              <Input type="datetime-local" />
            </div>
            {/* NUMERO PEDIDO */}
            <div className="col-span-12 md:col-span-3">
              <label className="block mb-1 font-medium">N° Pedido</label>
              <Input type="text" placeholder="000123" />
            </div>

            {/* MESA */}
            <div className="col-span-12 md:col-span-3">
              <label className="block mb-1 font-medium">Mesa</label>
              <Input type="number" placeholder="Mesa" />
            </div>

            {/* USUARIO */}
            <div className="col-span-12 md:col-span-3">
              <label className="block mb-1 font-medium">
                Usuario Registrado
              </label>
              <Input type="text" placeholder="Usuario" />
            </div>

            {/* ESTADO */}
            <div className="col-span-12 md:col-span-3">
              <label className="block mb-1 font-medium">Estado</label>
              <select className="w-full border rounded-md p-2">
                <option value="abierto">Pendiente</option>
                <option value="listo">Listo</option>
                <option value="entregado">Entregado</option>
                <option value="pagado">Pagado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            {/*{/* SUBTOTAL */}
            {/*<div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Subtotal</label>
              <Input type="number" step="0.01" placeholder="0.00" />
            </div>*/}

            {/* DESCUENTO */}
            {/*<div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Descuento</label>
              <Input type="number" step="0.01" placeholder="0.00" />
            </div>*/}

            {/* TOTAL */}
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Total</label>
              <Input type="number" step="0.01" placeholder="0.00" />
            </div>

            {/* NOTAS */}
            {/*<div className="col-span-12">
              <label className="block mb-1 font-medium">Notas</label>
              <textarea
                className="w-full border rounded-md p-2"
                placeholder="Ej: sin cebolla, rápido..."
              />
            </div>*/}
          </form>
        </CardContent>
      </Card>

      {/* DETALLE DEL PEDIDO */}
      <Card className="mt-5">
        <CardContent>
          <div className="w-full overflow-x-auto border rounded-lg mt-3">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Producto</th>
                  <th className="p-2">Cantidad</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Subtotal</th>
                  <th className="p-2">Notas</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {detalles.map((item) => (
                  <tr key={item.id} className="border-t">
                    {/* PRODUCTO */}
                    <td className="p-2">
                      <Input
                        placeholder="Producto"
                        value={item.nombre}
                        onChange={(e) =>
                          actualizarItem(item.id, 'nombre', e.target.value)
                        }
                      />
                    </td>

                    {/* CANTIDAD */}
                    <td className="p-2">
                      <Input
                        type="number"
                        min={1}
                        value={item.cantidad}
                        onChange={(e) =>
                          actualizarItem(
                            item.id,
                            'cantidad',
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>

                    {/* PRECIO */}
                    <td className="p-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={item.precio_unitario}
                        onChange={(e) =>
                          actualizarItem(
                            item.id,
                            'precio_unitario',
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>

                    {/* SUBTOTAL */}
                    <td className="p-2 text-center">
                      S/ {item.subtotal.toFixed(2)}
                    </td>

                    {/* NOTAS */}
                    <td className="p-2">
                      <Input
                        placeholder="Notas"
                        value={item.notas || ''}
                        onChange={(e) =>
                          actualizarItem(item.id, 'notas', e.target.value)
                        }
                      />
                    </td>

                    {/* ELIMINAR */}
                    <td className="p-2 text-center">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => eliminarItem(item.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOTALES */}
          <div className="mt-4 text-right">
            <p className="text-sm">
              Subtotal: <strong>S/ {subtotalGeneral.toFixed(2)}</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
