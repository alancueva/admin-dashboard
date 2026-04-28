'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftRight, Calendar, Check, Eye, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useParams } from 'next/navigation';
// Importamos los componentes del Dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'; // Ajusta la ruta según tu estructura

// Importamos DataTable
import DataTable from 'react-data-table-component';
import { useState } from 'react';

interface cajaIn {
  id_caja_movimiento: number;
  fecha_movimiento: string;
  tipo_movimiento: string;
  monto: number;
  descripcion: string;
  usuario_registro: string;
}

const caja: cajaIn[] = [
  {
    id_caja_movimiento: 1,
    fecha_movimiento: '2026-04-27',
    tipo_movimiento: 'Egreso',
    monto: 1200,
    descripcion: 'compras de gaseosa',
    usuario_registro: 'Alan'
  }
];

const columns = [
  {
    name: 'ID',
    selector: (row: cajaIn) => row.id_caja_movimiento,
    sortable: true,
    width: '80px'
  },
  {
    name: 'Fecha',
    selector: (row: cajaIn) =>
      new Date(row.fecha_movimiento).toLocaleString('es-PE'),
    sortable: true,
    wrap: true
  },
  {
    name: 'Tipo',
    selector: (row: cajaIn) => row.tipo_movimiento,
    sortable: true,
    cell: (row: any) => (
      <span
        className={`capitalize px-2 py-1 rounded-full text-xs font-medium
        ${
          row.tipo_movimiento.includes('Ingreso')
            ? 'bg-green-100 text-green-700'
            : row.tipo_movimiento.includes('Egreso') ||
                row.tipo_movimiento.includes('Gasto')
              ? 'bg-red-100 text-red-700'
              : 'bg-blue-100 text-blue-700'
        }`}
      >
        {row.tipo_movimiento.replace('_', ' ')}
      </span>
    )
  },
  {
    name: 'Descripción',
    selector: (row: cajaIn) => row.descripcion,
    wrap: true,
    grow: 2
  },
  {
    name: 'Monto',
    selector: (row: cajaIn) => row.monto,
    sortable: true,
    cell: (row: any) => (
      <span
        className={
          row.monto >= 0
            ? 'text-green-600 font-medium'
            : 'text-red-600 font-medium'
        }
      >
        S/ {parseFloat(row.monto).toFixed(2)}
      </span>
    )
  },
  {
    name: 'Usuario',
    selector: (row: cajaIn) => row.usuario_registro,
    sortable: true
  }
];
const paginacionOpciones = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos'
};
export default function ModificarCaja() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Función para cargar los movimientos (aquí iría tu fetch)
  const cargarMovimientos = async () => {
    if (!id) return;

    setLoading(true);
    try {
      // Ejemplo de fetch (ajusta según tu API)
      // const res = await fetch(`/api/caja/movimientos?id_caja_arqueo=${id}`);
      // const data = await res.json();
      // setMovimientos(data);
    } catch (error) {
      console.error('Error al cargar movimientos:', error);
      // setMovimientos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMostrarClick = () => {
    cargarMovimientos();
    setIsOpen(true);
  };
  return (
    <div>
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Modificar Caja Arqueo (Ver Registro)</CardTitle>

            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
                <Check className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  grabar
                </span>
              </Button>

              <Link href="/dashboard/caja/caja-arqueo">
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
              <label className="block mb-1 font-medium">Fecha Apretura</label>
              <div className="relative">
                <Input type="datetime-local" readOnly />
                <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-3">
              <label className="block mb-1 font-medium">Fecha Cierre</label>
              <div className="relative">
                <Input type="datetime-local" readOnly />
                <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6"></div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Monto Inicial</label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Total efectivo</label>
              <Input type="number" readOnly placeholder="0.00" />
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Total Tarjeta</label>
              <Input type="number" readOnly placeholder="0.00" />
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Total yape</label>
              <Input type="number" readOnly placeholder="0.00" />
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Total Plin</label>
              <Input type="number" readOnly placeholder="0.00" />
            </div>
            <div className="col-span-12 md:col-span-2"></div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Total Egreso</label>
              <Input type="number" readOnly placeholder="0.00" />
            </div>
            {/*<div className="col-span-12 md:col-span-2">
              <Button size="default" className="h-10 gap-1 mt-7">
                <Plus className="h-3.5 w-3.5" />
                <span className="sm:not-sr-only sm:whitespace-nowrap">
                  Mostrar
                </span>
              </Button>
            </div>*/}
            <div className="col-span-12 md:col-span-2 flex items-end">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={handleMostrarClick}
                    size="default"
                    className="h-10 gap-1 w-full"
                  >
                    <Eye className="h-4 w-4" />
                    Mostrar Movimientos
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle>
                      Movimientos de la Caja - Arqueo #{id}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex-1 overflow-auto">
                    <DataTable
                      columns={columns}
                      data={caja}
                      progressPending={loading}
                      pagination
                      paginationPerPage={10}
                      paginationRowsPerPageOptions={[10, 20, 50]}
                      paginationComponentOptions={paginacionOpciones}
                      noDataComponent={
                        <div className="py-10 text-center text-gray-500">
                          No hay movimientos registrados para este arqueo
                        </div>
                      }
                      highlightOnHover
                      striped
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Total Esperado</label>
              <Input type="number" readOnly placeholder="0.00" />
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Monto Real</label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Diferencia</label>
              <Input type="number" readOnly placeholder="0.00" />
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Estado</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                disabled={false}
                defaultValue="Abierto"
              >
                <option value="Abierto">Abierto</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>
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
