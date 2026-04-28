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
import {
  MoreHorizontal,
  PlusCircle,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { useState, useMemo } from 'react';

interface Movimiento {
  id_movimientos_stock: number;
  fecha_movimientos: string;
  tipo_movimientos: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
  id_productos: number;
  nombre_producto: string; // para mostrar en la tabla
  cantidad: number;
  costo_unitario: number;
  monto_total: number;
  descripcion: string;
  referencia: string;
  id_usuario: number;
  usuario_nombre?: string;
}

// Datos de ejemplo
const movimientos: Movimiento[] = [
  {
    id_movimientos_stock: 1,
    fecha_movimientos: '2026-04-27 10:15:00',
    tipo_movimientos: 'ENTRADA',
    id_productos: 2,
    nombre_producto: 'Inca Kola',
    cantidad: 50,
    costo_unitario: 2.5,
    monto_total: 125,
    descripcion: 'Compra a proveedor',
    referencia: 'COMP-20260427-001',
    id_usuario: 1,
    usuario_nombre: 'Juan Pérez'
  },
  // {
  //   id_movimientos_stock: 2,
  //   fecha_movimientos: '2026-04-27 14:30:00',
  //   tipo_movimientos: 'SALIDA',
  //   id_productos: 1,
  //   nombre_producto: 'Lomo Saltado',
  //   cantidad: 12,
  //   costo_unitario: 18.5,
  //   monto_total: 222,
  //   descripcion: 'Venta en mesa 5',
  //   referencia: 'VENTA-005',
  //   id_usuario: 2,
  //   usuario_nombre: 'María López'
  // },
  {
    id_movimientos_stock: 3,
    fecha_movimientos: '2026-04-28 09:00:00',
    tipo_movimientos: 'AJUSTE',
    id_productos: 2,
    nombre_producto: 'Inca Kola',
    cantidad: -3,
    costo_unitario: 2.5,
    monto_total: -7.5,
    descripcion: 'Ajuste por producto dañado',
    referencia: 'AJUSTE-001',
    id_usuario: 1,
    usuario_nombre: 'Juan Pérez'
  }
];

const columnas = [
  {
    name: 'ID',
    selector: (row: Movimiento) => row.id_movimientos_stock,
    sortable: true,
    width: '80px'
  },
  {
    name: 'Fecha',
    selector: (row: Movimiento) => row.fecha_movimientos,
    sortable: true,
    width: '170px'
  },
  {
    name: 'Tipo',
    selector: (row: Movimiento) => row.tipo_movimientos,
    sortable: true,
    cell: (row: Movimiento) => {
      const color =
        row.tipo_movimientos === 'ENTRADA'
          ? 'text-green-600 bg-green-100'
          : row.tipo_movimientos === 'SALIDA'
            ? 'text-red-600 bg-red-100'
            : 'text-amber-600 bg-amber-100';

      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
          {row.tipo_movimientos}
        </span>
      );
    },
    width: '120px'
  },
  {
    name: 'Producto',
    selector: (row: Movimiento) => row.nombre_producto,
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'Cantidad',
    selector: (row: Movimiento) => row.cantidad,
    sortable: true,
    cell: (row: Movimiento) => (
      <span
        className={
          row.cantidad >= 0 ? 'text-green-600' : 'text-red-600 font-medium'
        }
      >
        {row.cantidad > 0 ? '+' : ''}
        {row.cantidad}
      </span>
    ),
    width: '110px'
  },
  {
    name: 'Monto Total',
    selector: (row: Movimiento) => row.monto_total,
    sortable: true,
    cell: (row: Movimiento) => (
      <span className="font-medium">S/ {row.monto_total.toFixed(2)}</span>
    ),
    width: '130px'
  },
  {
    name: 'Referencia',
    selector: (row: Movimiento) => row.referencia,
    sortable: true
  },
  {
    name: 'Descripción',
    selector: (row: Movimiento) => row.descripcion,
    wrap: true
  },
  {
    name: 'Acciones',
    cell: (row: Movimiento) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <Link
            href={`/dashboard/inventario/movimientos_inventario/modificar-movimientos-inventario/${row.id_movimientos_stock}`}
          >
            <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
          </Link>
          {/*<DropdownMenuItem className="text-red-500">Eliminar</DropdownMenuItem>*/}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    width: '80px'
  }
];

const paginacionOpciones = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos'
};

export default function MovimientosPage() {
  const [filtro, setFiltro] = useState('');

  const datosFiltrados = useMemo(() => {
    return movimientos.filter(
      (mov) =>
        mov.nombre_producto.toLowerCase().includes(filtro.toLowerCase()) ||
        mov.descripcion.toLowerCase().includes(filtro.toLowerCase()) ||
        mov.referencia.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [filtro]);

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div>
            <CardTitle>Movimientos de Inventario</CardTitle>
            <CardDescription>
              Historial de entradas, salidas y ajustes de stock
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard/inventario/movimientos_inventario/registrar-movimientos-inventario">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filtro */}
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12 md:col-span-5">
            <label className="block mb-1 font-medium">
              Buscar por producto, descripción o referencia
            </label>
            <Input
              type="text"
              placeholder="Buscar movimientos..."
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
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 50]}
            paginationComponentOptions={paginacionOpciones}
            noDataComponent="No hay movimientos registrados"
            highlightOnHover
            pointerOnHover
          />
        </div>
      </CardContent>
    </Card>
  );
}
