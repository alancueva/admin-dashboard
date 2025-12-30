'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import DataTable, { createTheme } from 'react-data-table-component';
import Link from 'next/link';
import { useState } from 'react';
import { Selected } from '@/components/ui/Select';

interface entidades {
    id: number;
    tipo_entidad: string;
    tipo_documento: string;
    numero_documento: string;
    razon_social: string;
    telefono: string;
    estado: string;
}

const entidades_comerciales: entidades[] = [
    {
        id: 1,
        tipo_entidad: 'Cliente',
        tipo_documento: 'RUC',
        numero_documento: '20123456789',
        razon_social: 'Empresa ABC S.A.',
        telefono: '987654321',
        estado: 'Activo'
    },
    {
        id: 2,
        tipo_entidad: 'Proveedor',
        tipo_documento: 'DNI',
        numero_documento: '12345678',
        razon_social: 'Juan Perez',
        telefono: '912345678',
        estado: 'Inactivo'
    },
    {
        id: 3,
        tipo_entidad: 'Cliente',
        tipo_documento: 'RUC',
        numero_documento: '20456789012',
        razon_social: 'Comercial XYZ E.I.R.L.',
        telefono: '998877665',
        estado: 'Activo'
    }
];

const tipo_entidad: any[] = [
    { value: 1, label: 'Cliente' },
    { value: 2, label: 'Proveedor' },
    { value: 3, label: 'Transportista' }
]

const tipo_documento: any[] = [
    { value: 1, label: 'RUC' },
    { value: 2, label: 'DNI' },
    { value: 3, label: 'CEX' }
]

const columnas = [
    {
        name: 'Tipo de Entidad',
        selector: (row: entidades) => row.tipo_entidad,
        sortable: true
    },
    {
        name: 'Tipo de Documento',
        selector: (row: entidades) => row.tipo_documento,
        sortable: true
    },
    {
        name: 'Número de Documento',
        selector: (row: entidades) => row.numero_documento,
        sortable: true
    },
    {
        name: 'Razón Social',
        selector: (row: entidades) => row.razon_social,
        sortable: true
    },
    {
        name: 'Teléfono',
        selector: (row: entidades) => row.telefono,
        sortable: true
    },
    {
        name: 'Estado',
        selector: (row: entidades) => row.estado,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: entidades) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={`/Operaciones-Comerciales/Entidad/modificar-entidad/${row.id}`}>
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
export default function EntidadPage() {

    const [tipoEntidad, setTipoEntidad] = useState(null);
    const [tipoDocumento, setTipoDocumento] = useState(null);

    const [filtro, setFiltro] = useState('');
    const datosFiltrados = entidades_comerciales.filter((u) =>
        u.numero_documento.toLowerCase().includes(filtro.toLowerCase()) ||
        u.tipo_entidad.toLowerCase().includes(filtro.toLowerCase())

    );

    const tipoEntidadChange = (value: any) => {
        console.log("value:", value);
        setTipoEntidad(value);
    };

    const tipoDocumentoChange = (value: any) => {
        console.log("value:", value);
        setTipoDocumento(value);
    };


    return (
        <Card className="p-0 overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Entidades</CardTitle>
                        <CardDescription>Listado de Entidades</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/Operaciones-Comerciales/Entidad/registrar-entidad">
                            <Button
                                size="sm"
                                className="h-8 gap-1"
                            >
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Agregar
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-4 mt-2'>
                    <div className="col-span-12 md:col-span-2">
                        <label className="block mb-1 font-medium">
                            Tipo de Entidad
                        </label>
                        <Selected
                            value={tipoEntidad}
                            onChange={tipoEntidadChange}
                            options={tipo_entidad}
                            placeholder='Seleccione'
                            isDisabled={false}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-2">
                        <label className="block mb-1 font-medium">
                            Tipo de Documento
                        </label>
                        <Selected
                            value={tipoDocumento}
                            onChange={tipoDocumentoChange}
                            options={tipo_documento}
                            placeholder='Seleccione'
                            isDisabled={false}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-2">
                        <label className="block mb-1 font-medium">
                            Número de Documento
                        </label>
                        <Input
                            type="text"
                            placeholder="Número de documento..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <label className="block mb-1 font-medium">
                            Razón Social
                        </label>
                        <Input
                            type="text"
                            placeholder="Razón social..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">

                    <DataTable columns={columnas} data={datosFiltrados} progressPending={false} pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
                        paginationComponentOptions={paginacionOpciones}
                        noDataComponent="No hay registros para mostrar" />

                </div>
            </CardContent>
        </Card>
    );
}