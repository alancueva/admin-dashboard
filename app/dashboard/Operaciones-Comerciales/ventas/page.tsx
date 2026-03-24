'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { MoreHorizontal, PlusCircle, Printer } from 'lucide-react';
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { useState } from 'react';

/* =======================
   INTERFACE
======================= */
interface Venta {
  id: number;
  pedido_id: number;
  usuario_id: number;
  metodo_pago_principal: string;
  total_final: number;
  cambio: number;
  fecha_venta: string;
  impreso: boolean;
}

/* =======================
   DATA MOCK
======================= */
const ventas: Venta[] = [
  {
    id: 1,
    pedido_id: 101,
    usuario_id: 1,
    metodo_pago_principal: 'efectivo',
    total_final: 50,
    cambio: 5,
    fecha_venta: '2026-03-20 12:30',
    impreso: true
  },
  {
    id: 2,
    pedido_id: 102,
    usuario_id: 2,
    metodo_pago_principal: 'tarjeta',
    total_final: 80,
    cambio: 0,
    fecha_venta: '2026-03-20 13:10',
    impreso: false
  }
];

/* =======================
   BADGE MÉTODO PAGO
======================= */
const getMetodoColor = (metodo: string) => {
  switch (metodo) {
    case 'efectivo':
      return 'bg-green-200 text-green-800';
    case 'tarjeta':
      return 'bg-blue-200 text-blue-800';
    case 'transferencia':
      return 'bg-purple-200 text-purple-800';
    default:
      return 'bg-gray-200';
  }
};

const handlePrint = (venta: Venta) => {
  const contenido = `
    <div style="font-family: monospace; width: 250px;">
      <h3 style="text-align:center;">MI NEGOCIO</h3>
      <p>Venta: #${venta.id}</p>
      <p>Pedido: ${venta.pedido_id}</p>
      <p>Fecha: ${venta.fecha_venta}</p>
      <hr/>
      <p>Total: S/ ${venta.total_final.toFixed(2)}</p>
      <p>Cambio: S/ ${venta.cambio.toFixed(2)}</p>
      <hr/>
      <p style="text-align:center;">Gracias por su compra</p>
    </div>
  `;

  const ventana = window.open('', '', 'width=300,height=600');

  if (ventana) {
    ventana.document.write(contenido);
    ventana.document.close();
    ventana.print();
  }
};
/* =======================
   COLUMNAS
======================= */
const columnas = [
  {
    name: 'Venta',
    selector: (row: Venta) => `#${row.id}`,
    sortable: true
  },
  {
    name: 'Pedido',
    selector: (row: Venta) => row.pedido_id,
    sortable: true
  },
  {
    name: 'Usuario',
    selector: (row: Venta) => row.usuario_id,
    sortable: true
  },
  {
    name: 'Pago',
    cell: (row: Venta) => (
      <span
        className={`px-2 py-1 rounded text-xs ${getMetodoColor(row.metodo_pago_principal)}`}
      >
        {row.metodo_pago_principal}
      </span>
    ),
    sortable: true
  },
  {
    name: 'Total',
    selector: (row: Venta) => `S/ ${row.total_final.toFixed(2)}`,
    sortable: true
  },
  {
    name: 'Cambio',
    selector: (row: Venta) => `S/ ${row.cambio.toFixed(2)}`,
    sortable: true
  },
  {
    name: 'Fecha',
    selector: (row: Venta) => row.fecha_venta,
    sortable: true
  },
  {
    name: 'Ticket',
    cell: (row: Venta) => (
      <span
        className={`text-xs font-medium ${row.impreso ? 'text-green-600' : 'text-red-600'}`}
      >
        {row.impreso ? 'Impreso' : 'Pendiente'}
      </span>
    )
  },
  {
    name: 'Acciones',
    cell: (row: Venta) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          {/* VER DETALLE */}
          <DropdownMenuItem>
            <Link
              href={`/dashboard/Operaciones-Comerciales/ventas/detalle-de-venta/${row.id}`}
            >
              Ver Detalle
            </Link>
          </DropdownMenuItem>

          {/* 🔥 IMPRIMIR */}
          <DropdownMenuItem
            onClick={() => handlePrint(row)}
            className="cursor-pointer"
          >
            <Printer className="h-4 w-4 mr-2" />
            Imprimir Ticket
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
export default function VentasPage() {
  const [filtro, setFiltro] = useState('');

  const datosFiltrados = ventas.filter(
    (v) =>
      v.id.toString().includes(filtro) ||
      v.pedido_id.toString().includes(filtro) ||
      v.metodo_pago_principal.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div>
            <CardTitle>Ventas</CardTitle>
            <CardDescription>Listado de ventas</CardDescription>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard/ventas/registrar">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                Agregar
              </Button>
            </Link>
          </div>
        </div>

        {/* FILTRO */}
        <div className="grid grid-cols-12 gap-4 mt-2">
          <div className="col-span-12 md:col-span-4">
            <label className="block mb-1 font-medium">Buscar</label>
            <Input
              type="text"
              placeholder="Pedido, venta o método..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full overflow-x-auto">
          <DataTable
            columns={columnas}
            data={datosFiltrados}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            paginationComponentOptions={paginacionOpciones}
            noDataComponent="No hay ventas"
          />
        </div>
      </CardContent>
    </Card>
  );
}
