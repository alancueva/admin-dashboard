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
        <div>
            <CardHeader>
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
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombres</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="hidden md:table-cell">Rol</TableHead>
                            <TableHead className="hidden md:table-cell">VIgencia</TableHead>
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
