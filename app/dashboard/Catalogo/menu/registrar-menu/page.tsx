import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

const categoria_menu: any[] = [
  { value: 'categoria_1', label: 'Categoria 1' },
  { value: 'categoria_2', label: 'Categoria 2' },
  { value: 'categoria_3', label: 'Categoria 3' }
];

export default function RegistroForm() {
  return (
    <div>
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Registrar Menú</CardTitle>

            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
                <Check className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  grabar
                </span>
              </Button>

              <Link href="/dashboard/Catalogo/menu">
                <Button size="sm" className="h-8 gap-1">
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
        <CardContent className="mt-4">
          <form className="grid grid-cols-12 gap-4">
            {/* Código de Almacén */}
            {/*<div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">
                Código de Almacén
              </label>
              <Input
                type="number"
                placeholder="0"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>*/}
            {/* Nombre del Producto */}
            <div className="col-span-12 md:col-span-6">
              <label className="block mb-1 font-medium">Nombre del Menú</label>
              <Input
                type="text"
                placeholder="Ej. ceviche"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Precio</label>
              <Input
                type="number"
                placeholder="0"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Orden</label>
              <Input
                type="text"
                placeholder="0"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">Categoria</label>
              <select className="w-full border border-gray-300 rounded-md p-2">
                <option value="">Seleccione</option>
                {categoria_menu.map((tipo) => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Vigencia</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                disabled={true}
                defaultValue="SI"
              >
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </select>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
