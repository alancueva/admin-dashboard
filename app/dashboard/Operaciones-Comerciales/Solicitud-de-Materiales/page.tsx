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

interface solicitud_materiales {
    id: number;
    numero_solicitud: string;
    solicitante: string;
    fecha_solicitud: string;
    prioridad: string;
    estado: string;
}

const solicitud_materiales_comerciales: solicitud_materiales[] = [
    {
        id: 1,
        numero_solicitud: 'SM-001',
        solicitante: 'Juan Pérez',
        fecha_solicitud: '2023-06-01',
        prioridad: 'Alta',
        estado: 'pendiente'
    },
    {
        id: 2,
        numero_solicitud: 'SM-002',
        solicitante: 'María García',
        fecha_solicitud: '2023-06-02',
        prioridad: 'Media',
        estado: 'completada'
    }
];


const estado_opciones: any[] = [
    { value: 'pendiente', label: 'pendiente' },
    { value: 'Inactivo', label: 'Inactivo' },
    { value: 'completada', label: 'completada' },
    { value: 'cancelada', label: 'cancelada' }
];

const almacen_comercial:any[] = [
    { value: 1, label: 'Almacén Central' },
    { value: 2, label: 'Almacén Secundario' }
];

const columnas = [
    {
        name: 'Numero de Solicitud',
        selector: (row: solicitud_materiales) => row.numero_solicitud,
        sortable: true
    },
    {
        name: 'Solicitante',
        selector: (row: solicitud_materiales) => row.solicitante,
        sortable: true
    },
    {
        name: 'Fecha de Solicitud',
        selector: (row: solicitud_materiales) => row.fecha_solicitud,
        sortable: true
    },
    {
        name: 'Prioridad',
        selector: (row: solicitud_materiales) => row.prioridad,
        sortable: true
    },
    {
        name: 'Estado',
        selector: (row: solicitud_materiales) => row.estado,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: solicitud_materiales) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={`/Operaciones-Comerciales/Solicitud-de-Materiales/modificar-solicitud-de-materiales/${row.id}`}>
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
export default function SolicitudMaterialesPage() {

    const [almacen, setAlmacen] = useState(null);
    const [estado, setEstado] = useState(null);

    const [filtro, setFiltro] = useState('');
        const datosFiltrados = solicitud_materiales_comerciales.filter((u) =>
            u.numero_solicitud.toLowerCase().includes(filtro.toLowerCase()) 
    
        );

    const EstadoChange = (value: any) => {
        console.log("value:", value);
        setEstado(value);
    };

    const AlmacenChange = (value: any) => {
        console.log("value:", value);
        setAlmacen(value);
    };


    return (
        <Card className="p-0 overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Solicitud de Materiales</CardTitle>
                        <CardDescription>Listado de Solicitudes de Materiales</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/Operaciones-Comerciales/Solicitud-de-Materiales/registrar-solicitud-de-materiales">
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
                            Número de Solicitud
                        </label>
                        <Input
                            type="text"
                            placeholder="Número de solicitud..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-2">
                        <label className="block mb-1 font-medium">
                            Solicitante
                        </label>
                        <Input
                            type="text"
                            placeholder="Nombre del solicitante..."
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