'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

/* =======================
   INTERFACE
======================= */
interface Pedido {
  id: number;
  numero_pedido: string;
  mesa_id?: number | null;
  usuario_id: number;
  estado: string;
  total: number;
  fecha_apertura: string;
}

/* =======================
   DATA MOCK
======================= */
const pedidos: Pedido[] = [
  {
    id: 1,
    numero_pedido: '000123',
    mesa_id: 5,
    usuario_id: 1,
    estado: 'abierto',
    total: 45.5,
    fecha_apertura: '2026-03-20 12:30'
  },
  {
    id: 2,
    numero_pedido: '000124',
    mesa_id: 2,
    usuario_id: 2,
    estado: 'en_preparacion',
    total: 30.0,
    fecha_apertura: '2026-03-20 13:00'
  },
  {
    id: 3,
    numero_pedido: '000125',
    mesa_id: null,
    usuario_id: 1,
    estado: 'pagado',
    total: 60.0,
    fecha_apertura: '2026-03-20 14:10'
  }
];

/* =======================
   BADGE DE ESTADO
======================= */
const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'abierto':
      return 'bg-gray-200 text-gray-800';
    case 'en_preparacion':
      return 'bg-yellow-200 text-yellow-800';
    case 'listo':
      return 'bg-blue-200 text-blue-800';
    case 'entregado':
      return 'bg-green-200 text-green-800';
    case 'pagado':
      return 'bg-emerald-200 text-emerald-800';
    case 'cancelado':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-100';
  }
};

/* =======================
   COLUMNAS
======================= */
const columnas = [
  {
    name: 'N° Pedido',
    selector: (row: Pedido) => row.numero_pedido,
    sortable: true
  },
  {
    name: 'Mesa',
    selector: (row: Pedido) => row.mesa_id ?? '—',
    sortable: true
  },
  {
    name: 'Usuario',
    selector: (row: Pedido) => row.usuario_id,
    sortable: true
  },
  {
    name: 'Estado',
    cell: (row: Pedido) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${getEstadoColor(row.estado)}`}
      >
        {row.estado}
      </span>
    ),
    sortable: true
  },
  {
    name: 'Total',
    selector: (row: Pedido) => `S/ ${row.total.toFixed(2)}`,
    sortable: true
  },
  {
    name: 'Fecha',
    selector: (row: Pedido) => row.fecha_apertura,
    sortable: true
  },
  {
    name: 'Acciones',
    cell: (row: Pedido) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/operaciones-de-servicio/historial-pedido/detalle-pedido/${row.id}`}
            >
              Ver Detalles
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
];

/* =======================
   PAGINACION
======================= */
const paginacionOpciones = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos'
};

/* =======================
   COMPONENTE
======================= */
export default function PedidoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState(pedidos);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = pedidos.filter(
      (p) =>
        p.numero_pedido.toLowerCase().includes(value) ||
        p.estado.toLowerCase().includes(value)
    );

    setRecords(filtered);
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div>
            <CardTitle>Pedidos</CardTitle>
            <CardDescription>Listado de pedidos</CardDescription>
          </div>

          {/*<div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard/pedidos/nuevo">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                Agregar
              </Button>
            </Link>
          </div>*/}
        </div>
      </CardHeader>

      <CardContent>
        {/* BUSCADOR */}
        <div className="grid grid-cols-12 mb-4">
          <div className="col-span-12 md:col-span-4">
            <input
              type="text"
              placeholder="Buscar pedido..."
              className="w-full border rounded-md p-2"
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* TABLA */}
        <div className="w-full overflow-x-auto">
          <DataTable
            columns={columnas}
            data={records}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            paginationComponentOptions={paginacionOpciones}
            noDataComponent="No hay pedidos"
          />
        </div>
      </CardContent>
    </Card>
  );
}
