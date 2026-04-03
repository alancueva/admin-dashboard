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

import { MoreHorizontal, PlusCircle } from 'lucide-react';
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { useState } from 'react';

/**
 * INTERFACE
 */
interface Serie {
  id_series_comprobante: number;
  id_tipo_comprobante: number;
  serie: string;
  descripcion: string;
  numero: string;
  vigencia: string;
  fecha_creacion: string;
}

/**
 * MOCK DATA
 */
const series: Serie[] = [
  {
    id_series_comprobante: 1,
    id_tipo_comprobante: 1,
    serie: 'B001',
    descripcion: 'Boletas mostrador',
    numero: '00000001',
    vigencia: 'SI',
    fecha_creacion: '2024-01-01'
  },
  {
    id_series_comprobante: 2,
    id_tipo_comprobante: 2,
    serie: 'F001',
    descripcion: 'Facturas RUC',
    numero: '00000001',
    vigencia: 'NO',
    fecha_creacion: '2024-01-02'
  }
];

/**
 * COLUMNAS
 */
const columnas = [
  {
    name: 'Serie',
    selector: (row: Serie) => row.serie,
    sortable: true
  },
  {
    name: 'Descripción',
    selector: (row: Serie) => row.descripcion,
    sortable: true
  },
  {
    name: 'Número',
    selector: (row: Serie) => row.numero,
    sortable: true
  },
  {
    name: 'Vigencia',
    cell: (row: Serie) => (
      <span
        className={`px-2 py-1 rounded text-xs ${
          row.vigencia
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {row.vigencia ? 'SI' : 'NO'}
      </span>
    )
  },
  {
    name: 'Acciones',
    cell: (row: Serie) => (
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
              href={`/dashboard/Operaciones-Comerciales/comprobantes/series-comprobantes/modificar-series/${row.id_series_comprobante}`}
            >
              Ver Detalle
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
];

const paginacionOpciones = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos'
};

export default function SeriesComprobantesPage() {
  const [filtro, setFiltro] = useState('');

  const datosFiltrados = series.filter(
    (s) =>
      s.serie.toLowerCase().includes(filtro.toLowerCase()) ||
      s.descripcion.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div>
            <CardTitle>Series de Comprobantes</CardTitle>
            <CardDescription>Consulta y gestión de series</CardDescription>
          </div>

          <div className="ml-auto">
            <Link href="/dashboard/Operaciones-Comerciales/comprobantes/series-comprobantes/registrar-series">
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
            <label className="block mb-1 font-medium">
              Buscar Serie / Descripción
            </label>
            <Input
              type="text"
              placeholder="Ej: B001..."
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
            paginationRowsPerPageOptions={[5, 10, 20, 50]}
            paginationComponentOptions={paginacionOpciones}
            noDataComponent="No hay registros"
          />
        </div>
      </CardContent>
    </Card>
  );
}
