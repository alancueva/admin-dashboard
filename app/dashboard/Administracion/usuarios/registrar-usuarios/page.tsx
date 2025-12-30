"Use client";

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

export default function RegistrarUsuario() {

  const rol: any[] = [
    { value: 'administrador', label: 'Administrador' },
    { value: 'usuario', label: 'Usuario' }
  ];

  return (
    <div>
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Registrar Usuario</CardTitle>

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

              <Link href="/dashboard/Administracion/usuarios">
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
            <div className="col-span-12 md:col-span-3">
              <label className="block mb-1 font-medium">
                Rol
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2">
                <option value="">Seleccione</option>
                {rol.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Nombre del Usuario */}
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">
                Nombres
              </label>
              <Input
                type="text"
                placeholder="Nombre del usuario"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">
                Apellido Paterno
              </label>
              <Input
                type="text"
                placeholder="Apellido Paterno"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">
                Apellido Materno
              </label>
              <Input
                type="text"
                placeholder="Apellido Materno"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="block mb-1 font-medium">
                Email
              </label>
              <Input
                type="text"
                placeholder="Ej. aceitemail@ejemplo.com"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label className="block mb-1 font-medium">
                Contraseña
              </label>
              <Input
                type="text"
                placeholder="Contraseña"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>


          </form>
        </CardContent>
      </Card>
    </div>
  );
}