'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import RegistroProductoForm from './registra-producto/page';
import {ProductsTable} from './products-table';

const products: any[] = [
  {
    id: 1,
    name: 'Aceite Capilar',
    status: 'active',
    price: 10.99,
    stock: 50,
    availableAt: new Date('2023-01-15')
  }
];

export default function ProductPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        {/* <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList> */}
        <div className="ml-auto flex items-center gap-2">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button> */}
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {showForm ? 'Cerrar' : 'Agregar'}
            </span>
          </Button>
        </div>
      </div>

      {showForm ? (
        <div className="mt-4">
          <RegistroProductoForm />
        </div>
      ) : (
        <TabsContent value="all">
          {/* El componente ProductsTable necesita ser adaptado para funcionar en el cliente */}
          {/* <ProductsTable products={[]} offset={0} totalProducts={0} /> */}
          <ProductsTable products={products} offset={0} totalProducts={0} />
        </TabsContent>
      )}
    </Tabs>
  );
}
