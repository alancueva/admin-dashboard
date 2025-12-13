'use client';
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import DataTable from 'react-data-table-component';
import { MoreHorizontal, PlusCircle, Pencil, Trash2 } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';


interface Roles {
    id: number;
    nombres: string;
}

const rolesIniciales: Roles[] = [
    { id: 1, nombres: 'Administrador' },
    { id: 2, nombres: 'Usuario' },
    { id: 3, nombres: 'Operador' }
];

export default function RolPage() {
    const [roles, setRoles] = useState<Roles[]>(rolesIniciales);
    const [openRegistrar, setOpenRegistrar] = useState(false);
    const [openModificar, setOpenModificar] = useState(false);
    const [rolActual, setRolActual] = useState<Roles | null>(null);
    const [nombreRol, setNombreRol] = useState('');

    const handleRegistrar = () => {
        if (nombreRol.trim()) {
            const nuevoRol: Roles = {
                id: Math.max(...roles.map(r => r.id), 0) + 1,
                nombres: nombreRol.trim()
            };
            setRoles([...roles, nuevoRol]);
            setNombreRol('');
            setOpenRegistrar(false);
        }
    };

    const handleModificar = () => {
        if (rolActual && nombreRol.trim()) {
            setRoles(roles.map(r => 
                r.id === rolActual.id 
                    ? { ...r, nombres: nombreRol.trim() }
                    : r
            ));
            setNombreRol('');
            setRolActual(null);
            setOpenModificar(false);
        }
    };

    const handleEliminar = (id: number) => {
        if (confirm('¿Está seguro de eliminar este rol?')) {
            setRoles(roles.filter(r => r.id !== id));
        }
    };

    const abrirModalModificar = (rol: Roles) => {
        setRolActual(rol);
        setNombreRol(rol.nombres);
        setOpenModificar(true);
    };

    const columnas = [
        {
            name: 'ID',
            selector: (row: Roles) => row.id,
            sortable: true,
            width: '100px'
        },
        {
            name: 'Nombre',
            selector: (row: Roles) => row.nombres,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: (row: Roles) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => abrirModalModificar(row)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            onClick={() => handleEliminar(row.id)}
                            className="text-red-600"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            width: '100px'
        }
    ];

    const paginacionOpciones = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div>
                            <CardTitle>Rol</CardTitle>
                            <CardDescription>Listado de Rol</CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <Button
                                size="sm"
                                className="h-8 gap-1"
                                onClick={() => setOpenRegistrar(true)}
                            >
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Agregar
                                </span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <DataTable 
                            columns={columnas} 
                            data={roles} 
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

            {/* Modal Registrar */}
            <Dialog open={openRegistrar} onOpenChange={setOpenRegistrar}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Registrar Rol</DialogTitle>
                        <DialogDescription>
                            Ingrese los datos del nuevo rol
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="nombre-registro" className="text-right">
                                Nombre
                            </label>
                            <Input
                                id="nombre-registro"
                                value={nombreRol}
                                onChange={(e) => setNombreRol(e.target.value)}
                                className="col-span-3"
                                placeholder="Ej: Supervisor"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                setOpenRegistrar(false);
                                setNombreRol('');
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button onClick={handleRegistrar}>
                            Guardar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Modificar */}
            <Dialog open={openModificar} onOpenChange={setOpenModificar}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Modificar Rol</DialogTitle>
                        <DialogDescription>
                            Actualice los datos del rol
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="id-modificar" className="text-right">
                                ID
                            </label>
                            <Input
                                id="id-modificar"
                                value={rolActual?.id || ''}
                                className="col-span-3"
                                disabled
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="nombre-modificar" className="text-right">
                                Nombre
                            </label>
                            <Input
                                id="nombre-modificar"
                                value={nombreRol}
                                onChange={(e) => setNombreRol(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                setOpenModificar(false);
                                setNombreRol('');
                                setRolActual(null);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button onClick={handleModificar}>
                            Actualizar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}