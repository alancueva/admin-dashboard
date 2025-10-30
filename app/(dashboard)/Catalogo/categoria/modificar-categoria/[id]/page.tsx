'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Home,
    PlusCircle,
    Package,
    Package2,
    PanelLeft,
    Settings,
    ShoppingCart,
    Users2,
    ArrowLeftRight,
    Check,
    ShieldPlus,
    SlidersVertical
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from "next/navigation";

export default function ModificarCategoria() {
    const { id } = useParams();
    return (
        <div>
            <Card className="sticky top-0 z-50 mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Modificar Categoria (Ver Registro)</CardTitle>
                        <p>ID recibido: {id}</p>
                        <div className="ml-auto flex items-center gap-2">
                            <Button
                                size="sm"
                                className="h-8 gap-1"
                            >
                                <Check className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    grabar
                                </span>
                            </Button>

                            <Link href="/Catalogo/categoria">
                                <Button
                                    size="sm"
                                    className="h-8 gap-1"
                                >
                                    <ArrowLeftRight className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Volver
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardContent>
                    <form className="grid grid-cols-12 gap-4 mt-2">
                        {/* Nombre del categoria */}
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Nombres
                            </label>
                            <Input
                                type="text"
                                placeholder="Nombres de categoria"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-8">
                        </div>
                        <div className="col-span-12 md:col-span-12">
                            <label className="block mb-1 font-medium">
                                Descripción
                            </label>
                            <Input
                                type="text"
                                placeholder="Descripción"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Nivel
                            </label>
                            <Input
                                type="text"
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Orden
                            </label>
                            <Input
                                type="text"
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>


                    </form>
                </CardContent>
            </Card>
        </div>
    );
}