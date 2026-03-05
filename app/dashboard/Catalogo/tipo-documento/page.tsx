'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { File, MoreHorizontal, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import DataTable, { createTheme } from 'react-data-table-component';
import { useState } from 'react';

interface tipodocumento {
  id_tipo_documento: number;
  nombre: string;
  descripcion: string;
  abreviatura: string;
  longitud: number;
  vigencia: string;
}

const tipo_documento: tipodocumento[] = [
  {
    id_tipo_documento: 1,
    nombre: 'Documento Nacional de Identidad',
    descripcion: 'Documento de identidad peruano',
    abreviatura: 'DNI',
    longitud: 8,
    vigencia: 'SI'
  },
  {
    id_tipo_documento: 2,
    nombre: 'Registro Único de Contribuyentes',
    descripcion: 'Documento tributario de empresas o personas',
    abreviatura: 'RUC',
    longitud: 11,
    vigencia: 'SI'
  },
  {
    id_tipo_documento: 3,
    nombre: 'Pasaporte',
    descripcion: 'Documento para viajar internacionalmente',
    abreviatura: 'PAS',
    longitud: 15,
    vigencia: 'SI'
  },
  {
    id_tipo_documento: 4,
    nombre: 'Carné de Extranjería',
    descripcion: 'Documento para extranjeros residentes',
    abreviatura: 'CE',
    longitud: 9,
    vigencia: 'SI'
  }
];

const columnas = [
  {
    name: 'ID',
    selector: (row: tipodocumento) => row.id_tipo_documento,
    sortable: true
  },
  {
    name: 'Nombres',
    selector: (row: tipodocumento) => row.nombre,
    sortable: true
  },
  {
    name: 'Descripcion',
    selector: (row: tipodocumento) => row.descripcion,
    sortable: true
  },
  {
    name: 'Abreviatura',
    selector: (row: tipodocumento) => row.abreviatura,
    sortable: true
  },
  {
    name: 'Longitud',
    selector: (row: tipodocumento) => row.longitud,
    sortable: true
  },
  {
    name: 'Vigencia',
    selector: (row: tipodocumento) => row.vigencia,
    sortable: true
  },
  {
    name: 'Acciones',
    cell: (row: tipodocumento) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/Catalogo/tipo-documento/modificar-tipo-documento/${row.id_tipo_documento}`}
            >
              Ver Detalles
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

export default function UnidadMedidaPage() {
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState(tipo_documento);

  const handleFilter = (status: string, search: string) => {
    const lowercasedSearch = search.toLowerCase();
    const filteredData = tipo_documento.filter((user) => {
      const matchesSearch = user.nombre
        .toLowerCase()
        .includes(lowercasedSearch);
      return matchesSearch;
    });
    setRecords(filteredData);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    handleFilter(selectedStatus, newSearchTerm);
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div>
            <CardTitle>Tipo de Documento</CardTitle>
            <CardDescription>Listado de Tipos de Documentos</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard/Catalogo/tipo-documento/registrar-tipo-documento">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* <div className='grid grid-cols-12 gap-4 mt-2'>
                                    <div className="col-span-12 md:col-span-4">
                                        <label className="block mb-1 font-medium">
                                            Unidad de Medida
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Buscar Unidad de Medida..."
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            onChange={handleSearchChange}
                                        />
                                    </div>

                                </div> */}
        <div className="w-full overflow-x-auto">
          <DataTable
            columns={columnas}
            data={tipo_documento}
            progressPending={false}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
            paginationComponentOptions={paginacionOpciones}
            noDataComponent="No hay registros para mostrar"
          />
        </div>
      </CardContent>
    </Card>
  );
}
