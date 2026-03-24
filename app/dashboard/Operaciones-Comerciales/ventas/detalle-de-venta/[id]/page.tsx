'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Selected } from '@/components/ui/Select';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  Check,
  ArrowLeftRight,
  Plus,
  MoreHorizontal,
  Calendar,
  Printer
} from 'lucide-react';
import Link from 'next/link';

/**
 * OPTIONS
 */
const metodo_pago_options = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'tarjeta', label: 'Tarjeta' },
  { value: 'transferencia', label: 'Transferencia' },
  { value: 'otro', label: 'Otro' }
];

/**
 * DETALLE MOCK
 */

interface DetalleVenta {
  id: number;
  menu_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  notas_item: string;
  metodoPago: string;
}

const detalle_mock: DetalleVenta[] = [
  {
    id: 1,
    menu_id: 1,
    cantidad: 2,
    precio_unitario: 10,
    subtotal: 20,
    notas_item: 'Sin cebolla',
    metodoPago: 'Efectivo'
  }
];

/**
 * COLUMNAS DETALLE
 */
const columnas = [
  {
    name: 'Menu ID',
    selector: (row: DetalleVenta) => row.menu_id
  },
  {
    name: 'Cantidad',
    selector: (row: DetalleVenta) => row.cantidad
  },
  {
    name: 'Precio Unitario',
    selector: (row: DetalleVenta) => row.precio_unitario
  },
  {
    name: 'Subtotal',
    selector: (row: DetalleVenta) => row.subtotal
  },
  {
    name: 'Notas',
    selector: (row: DetalleVenta) => row.notas_item
  }
  // {
  //   name: 'Acciones',
  //   cell: () => (
  //     <Button size="icon" variant="ghost">
  //       <MoreHorizontal className="h-4 w-4" />
  //     </Button>
  //   )
  // }
];

const handlePrint = () => {
  const empresa = {
    nombre: 'MI NEGOCIO SAC',
    ruc: '20123456789',
    direccion: 'Av. Principal 123 - Perú'
  };

  const serie = 'B001';
  const correlativo = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(6, '0');

  const fecha = new Date().toLocaleString();

  const subtotal = detalle_mock.reduce((acc, d) => acc + d.subtotal, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  const contenido = `
    <html>
    <head>
      <style>
        body {
          font-family: monospace;
          width: 260px;
          margin: 0;
          padding: 10px;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .line { border-top: 1px dashed #000; margin: 5px 0; }
        .row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        .small { font-size: 11px; }
      </style>
    </head>
    <body>

      <div class="center bold">${empresa.nombre}</div>
      <div class="center small">RUC: ${empresa.ruc}</div>
      <div class="center small">${empresa.direccion}</div>

      <div class="line"></div>

      <div class="center bold">BOLETA DE VENTA</div>
      <div class="center">${serie}-${correlativo}</div>

      <div class="line"></div>

      <div class="small">Fecha: ${fecha}</div>

      <div class="line"></div>

      ${detalle_mock
        .map(
          (item) => `
        <div class="small">${item.cantidad} x Producto ${item.menu_id}</div>
        <div class="row">
          <span>P.Unit: S/ ${item.precio_unitario}</span>
          <span>S/ ${item.subtotal}</span>
        </div>
      `
        )
        .join('')}

      <div class="line"></div>

      <div class="row bold">
        <span>SUBTOTAL</span>
        <span>S/ ${subtotal.toFixed(2)}</span>
      </div>

      <div class="row">
        <span>IGV (18%)</span>
        <span>S/ ${igv.toFixed(2)}</span>
      </div>

      <div class="row bold">
        <span>TOTAL</span>
        <span>S/ ${total.toFixed(2)}</span>
      </div>

      <div class="line"></div>

      <div class="small">Método Pago: Efectivo</div>

      <div class="line"></div>

      <div class="center small">
        Gracias por su compra
      </div>

    </body>
    </html>
    `;

  const ventana = window.open('', '', 'width=300,height=600');

  if (ventana) {
    ventana.document.write(contenido);
    ventana.document.close();
    ventana.print();
  }
};

export default function VentaPage() {
  const [metodoPago, setMetodoPago] = useState(null);
  const [impreso, setImpreso] = useState(null);
  const [serie, setSerie] = useState(null);
  const [numero, setNumero] = useState('');

  const metadoChange = (value: any) => {
    setMetodoPago(value);
  };

  const ImpresoChange = (value: any) => {
    setImpreso(value);
  };

  const serieChange = (value: any) => {
    setSerie(value);
  };

  const impresoo = [
    { value: 'SI', label: 'SI' },
    { value: 'NO', label: 'NO' }
  ];

  const series_comprobante = [
    { value: 1, label: 'B001 - Boleta' },
    { value: 2, label: 'F001 - Factura' }
  ];
  return (
    <div>
      {/* HEADER */}
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Detalle de Venta</CardTitle>

            <div className="ml-auto flex gap-2">
              {/*<Button size="sm">
                <Check className="h-3.5 w-3.5" />
                Guardar
              </Button>*/}
              <Button size="sm" onClick={handlePrint}>
                <Printer className="h-3.5 w-3.5" />
                Imprimir
              </Button>

              <Link href="/dashboard/ventas">
                <Button size="sm">
                  <ArrowLeftRight className="h-3.5 w-3.5" />
                  Volver
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* CABECERA */}
      <Card>
        <CardContent>
          <form className="grid grid-cols-12 gap-4 mt-2">
            <div className="col-span-12 md:col-span-2">
              <label className="mb-1 font-medium">Código de Ventas</label>
              <Input
                type="number"
                placeholder="0"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            {/*<div className="col-span-12 md:col-span-3">
              <label>Método de Pago Principal</label>
              <Selected
                value={metodoPago}
                onChange={metadoChange}
                options={metodo_pago_options}
              />
            </div>*/}
            <div className="col-span-12 md:col-span-3">
              <label>Tipo / Serie Comprobante</label>
              <Selected
                value={serie}
                onChange={serieChange}
                options={series_comprobante}
                placeholder="Seleccione"
              />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Número</label>
              <Input
                type="number"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="000001"
              />
            </div>
            {/* RELACIONES */}
            <div className="col-span-12 md:col-span-3">
              <label className="mb-1">Pedido ID</label>
              <Input type="number" />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Caja Diaria ID</label>
              <Input type="number" />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Usuario ID</label>
              <Input type="number" />
            </div>

            {/* TOTALES */}
            <div className="col-span-12 md:col-span-3">
              <label>Total Pedido</label>
              <Input type="number" />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Descuento</label>
              <Input type="number" />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Total Final</label>
              <Input type="number" />
            </div>

            {/* PAGOS */}
            <div className="col-span-12 md:col-span-3">
              <label>Método de Pago Principal</label>
              <Selected
                value={metodoPago}
                onChange={metadoChange}
                options={metodo_pago_options}
              />
              {/* onChange={setMetodoPago}*/}
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Monto Efectivo</label>
              <Input type="number" />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Monto Tarjeta</label>
              <Input type="number" />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Monto Transferencia</label>
              <Input type="number" />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Monto Otro</label>
              <Input type="number" />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Total Recibido</label>
              <Input type="number" />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Cambio</label>
              <Input type="number" />
            </div>

            {/* FECHA */}
            <div className="col-span-12 md:col-span-3">
              <label>Fecha Venta</label>
              <div className="relative">
                <Input type="datetime-local" />
                <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* OTROS */}
            <div className="col-span-12 md:col-span-6">
              <label>Notas</label>
              <Input type="text" />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label>Impreso</label>
              <Selected
                value={impreso}
                onChange={ImpresoChange}
                options={impresoo}
              />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* DETALLE */}
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Detalle de Venta</CardTitle>

            <div className="ml-auto">
              {/*<Button size="sm">
                <Plus className="h-3.5 w-3.5" />
                Agregar Detalle
              </Button>*/}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columnas}
            data={detalle_mock}
            noDataComponent="No hay detalles"
          />
        </CardContent>
      </Card>
    </div>
  );
}
