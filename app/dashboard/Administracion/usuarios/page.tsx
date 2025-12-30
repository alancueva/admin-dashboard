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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, MoreHorizontal, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import DataTable, { createTheme } from 'react-data-table-component';
import { useState } from 'react';
interface UserIN {
    id: number;
    nombres: string;
    email: string;
    rol: string;
    vigencia: string;
}


const users:UserIN[] = [
    {
        id: 1,
        nombres: 'Juan Perez',
        email: 'juan.perez@example.com',
        rol: 'Administrador',
        vigencia: 'SI'
    },
    {
        id: 2,
        nombres: 'Maria Gomez',
        email: 'maria.gomez@example.com',
        rol: 'Usuario',
        vigencia: 'NO'
    },
    {
        id: 3,
        nombres: 'Carlos Sanchez',
        email: 'carlos.sanchez@example.com',
        rol: 'Administrador',
        vigencia: 'SI'
    },
    {
        id: 4,
        nombres: 'Ana Martinez',
        email: 'ana.martinez@example.com',
        rol: 'Usuario',
        vigencia: 'NO'
    },
    {
        id: 5,
        nombres: 'Luis Rodriguez',
        email: 'luis.rodriguez@example.com',
        rol: 'Administrador',
        vigencia: 'SI'
    },
    {
        id: 6,
        nombres: 'Sofia Lopez',
        email: 'sofia.lopez@example.com',
        rol: 'Usuario',
        vigencia: 'NO'
    },


];


const columnas = [
    {
        name: 'ID',
        selector: (row: UserIN) => row.id,
        sortable: true
    },
    {
        name: 'Nombres',
        selector: (row: UserIN) => row.nombres,
        sortable: true
    },
    {
        name: 'Email',
        selector: (row: UserIN) => row.email,
        sortable: true
    },
    {
        name: 'Rol',
        selector: (row: UserIN) => row.rol,
        sortable: true
    },
    {
        name: 'Vigencia',
        selector: (row: UserIN) => row.vigencia,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: UserIN) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={`/dashboard/Administracion/tipos-negocio/modificar-negocio/${row.id}`}>
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
export default function UsuarioPage() {
     const [selectedStatus, setSelectedStatus] = useState('Todos');
        const [searchTerm, setSearchTerm] = useState('');
        const [records, setRecords] = useState(users);
    
        const handleFilter = (status: string, search: string) => {
            const lowercasedSearch = search.toLowerCase();
            const filteredData = users.filter(user => {
                const matchesStatus = status === 'Todos' || user.vigencia === status;
                const matchesSearch = user.nombres.toLowerCase().includes(lowercasedSearch) ||
                    user.email.toLowerCase().includes(lowercasedSearch);
                return matchesStatus && matchesSearch;
            });
            setRecords(filteredData);
        };
    
        const vigencia = [
            { id: "Todos", vigencia: 'Todos' },
            { id: "SI", vigencia: 'SI' },
            { id: "NO", vigencia: 'NO' }
        ];
    
        const handleStatusChange = (status: string) => {
            setSelectedStatus(status);
            handleFilter(status, searchTerm);
        };
    
        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newSearchTerm = e.target.value;
            setSearchTerm(newSearchTerm);
            handleFilter(selectedStatus, newSearchTerm);
        }

    return (
        <Card className="p-0 overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Usuarios</CardTitle>
                        <CardDescription>Listado de Usuarios</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/dashboard/Administracion/usuarios/registrar-usuarios">
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

            </CardHeader>
            <CardContent>

                <div className='grid grid-cols-12 gap-4 mt-2'>
                    <div className="col-span-12 md:col-span-4">
                        <label className="block mb-1 font-medium">
                            Usuarios
                        </label>
                        <Input
                            type="text"
                            placeholder="Buscar usuarios..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <label className="block mb-1 font-medium">
                            Vigencia
                        </label>
                        <select 
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={selectedStatus}
                            onChange={(e) => handleStatusChange(e.target.value)}
                        >
                            {vigencia.map((est) => (
                                <option key={est.id} value={est.vigencia}>
                                    {est.vigencia}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>



                <div className="w-full overflow-x-auto">

                    <DataTable columns={columnas} data={users} progressPending={false} pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
                        paginationComponentOptions={paginacionOpciones}
                        noDataComponent="No hay registros para mostrar" />

                </div>
            </CardContent>

        </Card>
    );
}