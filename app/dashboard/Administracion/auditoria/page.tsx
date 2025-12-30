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
// import { Selected } from '@/components/ui/Select';

interface auditoria {
    id: number;
    usuario: string;
    fecha_hora: string;
    modulo: string;
    opcion: string;
    accion: string;
}

const auditoria_comerciales: auditoria[] = [
    {
        id: 1,
        usuario: 'admin',
        fecha_hora: '2024-06-01 10:15:30',
        modulo: 'Catalogo',
        opcion: 'categoria',
        accion: 'grabar'
    },
    {
        id: 2,
        usuario: 'user1',
        fecha_hora: '2024-06-02 14:30:45',
        modulo: 'Almacén e Inventarios',
        opcion: 'Almacenes',
        accion: 'modificar'
    },
    {
        id: 3,
        usuario: 'user2',
        fecha_hora: '2024-06-03 09:20:10',
        modulo: 'Almacén e Inventarios',
        opcion: 'productos',
        accion: 'consultar'
    }
];



const columnas = [
    {
        name: 'Usuario',
        selector: (row: auditoria) => row.usuario,
        sortable: true
    },
    {
        name: 'Fecha y Hora',
        selector: (row: auditoria) => row.fecha_hora,
        sortable: true
    },
    {
        name: 'Módulo',
        selector: (row: auditoria) => row.modulo,
        sortable: true
    },
    {
        name: 'Opción',
        selector: (row: auditoria) => row.opcion,
        sortable: true
    },
    {
        name: 'Acción',
        selector: (row: auditoria) => row.accion,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: auditoria) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={`/dashboard/Administracion/auditoria/detalle-auditoria/${row.id}`}>
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
export default function AuditoriaPage() {

    const [filtro, setFiltro] = useState('');
    const datosFiltrados = auditoria_comerciales.filter((u) =>
        u.usuario.toLowerCase().includes(filtro.toLowerCase())
    );


    return (
        <Card className="p-0 overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Auditorias</CardTitle>
                        <CardDescription>Listado de Auditorias</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        {/* <Link href="/Operaciones-Comerciales/Entidad/registrar-entidad">
                            <Button
                                size="sm"
                                className="h-8 gap-1"
                            >
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Agregar
                                </span>
                            </Button>
                        </Link> */}
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-4 mt-2'>

                    <div className="col-span-12 md:col-span-3">
                        <label className="block mb-1 font-medium">
                            Usuario
                        </label>
                        <Input
                            type="text"
                            placeholder="Usuario..."
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