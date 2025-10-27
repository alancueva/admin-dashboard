'use client';

import { TableHead, TableRow, TableHeader, TableBody, Table } from '@/components/ui/table';
import {
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Users } from './users';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function UsersTable({
    users,
    offset,
    totalUsers
}: {
    users: any[];
    offset: number;
    totalUsers: number;
}) {
    let router = useRouter();
    let usersPerPage = 5;

    function prevPage() {
        router.back();
    }

    function nextPage() {
        router.push(`/?offset=${offset}`, { scroll: false });
    }

    const [selectedStatus, setSelectedStatus] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [records, setRecords] = useState(users);

    const handleFilter = (status: string, search: string) => {
        const lowercasedSearch = search.toLowerCase();
        const filteredData = users.filter(user => {
            const matchesStatus = status === 'Todos' || user.status === status;
            const matchesSearch = user.nombres.toLowerCase().includes(lowercasedSearch) ||
                user.email.toLowerCase().includes(lowercasedSearch);
            return matchesStatus && matchesSearch;
        });
        setRecords(filteredData);
    };

    const estado = [
        { id: "Todos", status: 'Todos' },
        { id: "Activo", status: 'Activo' },
        { id: "Inactivo", status: 'Inactivo' }
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
        <div>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 md:grow-0">
                        {/* <label htmlFor="estado">Usuarios</label> */}
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar usuarios..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
                            onChange={handleSearchChange} />
                        </div>
                    </div>
                    <div className="relative flex-1 md:grow-0">
                        {/* <label htmlFor="estado">Estado</label> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild  >
                                <Button aria-haspopup="false" size="lg" variant="outline">
                                    {selectedStatus}
                                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="-mr-1 size-5 text-gray-400">
                                        <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                                    </svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {estado.map((est) => (
                                    <DropdownMenuItem key={est.id} onSelect={() => handleStatusChange(est.status)}>{est.status}</DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombres</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="hidden md:table-cell">Rol</TableHead>
                            <TableHead className="hidden md:table-cell">Estado</TableHead>
                            <TableHead>
                                <span className="sr-only">Acciones</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {records.map((user) => (
                            <Users key={user.id} user={user} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            <CardFooter>
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground">
                        Mostrando {' '}
                        <strong>
                            {Math.max(0, Math.min(offset - usersPerPage, totalUsers) + 1)}-{offset}
                        </strong>{' '}
                        De <strong>{totalUsers}</strong> Usuarios
                    </div>
                    <div className="flex">
                        <Button
                            formAction={prevPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset === usersPerPage}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Anterior
                        </Button>
                        <Button
                            formAction={nextPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset + usersPerPage > totalUsers}
                        >
                            Siguiente
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </CardFooter>
        </div>
    );
}
