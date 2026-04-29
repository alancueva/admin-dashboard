'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  UtensilsCrossed,
  Users,
  Receipt,
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  DollarSign,
  HandPlatter,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardRestaurante() {
  const [usuario] = useState('Alan Cueva');
  const stats = [
    {
      title: 'Ventas del Día',
      value: 'S/ 2,845.50',
      icon: DollarSign,
      color: 'bg-green-500',
      trend: '+18% respecto a ayer'
    },
    {
      title: 'Pedidos Completados',
      value: '38',
      icon: HandPlatter,
      color: 'bg-blue-500',
      trend: '90% del total'
    },
    {
      title: 'Promedio por Pedido',
      value: 'S/ 67.75',
      icon: Receipt,
      color: 'bg-purple-500',
      trend: 'Buen desempeño'
    }
  ];

  // Productos con stock bajo (simulación)
  const productosStockBajo = [
    { id: 2, nombre: 'Cerveza Pilsen', stock: 8, unidad: 'und' }
  ];

  const pedidosRecientes = [
    { id: 101, total: 'S/. 128.50', hora: '13:45' },
    { id: 102, total: 'S/. 95.00', hora: '13:30' },
    { id: 103, total: 'S/. 45.00', hora: '13:15' },
    { id: 104, total: 'S/. 210.00', hora: '12:50' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard del Restaurante
          </h1>
          <p className="text-gray-500 mt-1">
            Bienvenido de nuevo, <span className="font-medium">{usuario}</span>
          </p>
        </div>

        <Link href="/dashboard/operaciones-de-servicio/pedidos">
          <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl">
            <PlusCircle className="w-5 h-5" />
            Nuevo Pedido
          </Button>
        </Link>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
            </div>
            {stat.trend && (
              <p className="text-xs text-emerald-600 mt-4 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pedidos Recientes */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Pedidos Recientes
            </h2>
            <Link
              href="/dashboard/operaciones-de-servicio/historial-pedido"
              className="text-blue-600 hover:underline text-sm flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {pedidosRecientes.map((pedido) => (
              <div
                key={pedido.id}
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border">
                    <HandPlatter className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Pedido #{pedido.id}</p>
                    <p className="text-sm text-gray-500">
                      Registrado a las {pedido.hora}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-semibold text-lg">{pedido.total}</p>
                  </div>

                  <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    Completado
                  </span>

                  <Link
                    href={`/dashboard/operaciones-de-servicio/historial-pedido/detalle-pedido/${pedido.id}`}
                  >
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Ver
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productos con Stock Bajo + Acciones Rápidas */}
        <div className="lg:col-span-5 space-y-6">
          {/* Productos con Stock Bajo */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="font-semibold">Stock Bajo</h2>
            </div>

            <div className="space-y-3">
              {productosStockBajo.map((producto) => (
                <div
                  key={producto.id}
                  className="flex justify-between items-center p-3 bg-amber-50 border border-amber-200 rounded-xl"
                >
                  <div>
                    <p className="font-medium">{producto.nombre}</p>
                    <p className="text-xs text-gray-500">
                      Stock actual: {producto.stock} {producto.unidad}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                    Reponer pronto
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard/inventario/productos"
              className="text-blue-600 text-sm mt-4 inline-block hover:underline"
            >
              Ver todo el inventario →
            </Link>
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/dashboard/inventario/productos">
                <div className="p-5 border border-gray-200 hover:border-gray-300 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer h-full">
                  <ShoppingCart className="w-8 h-8 text-blue-600 mb-3" />
                  <p className="font-medium">Ver Menú</p>
                  <p className="text-xs text-gray-500 mt-1">Productos</p>
                </div>
              </Link>

              <Link href="/dashboard/Operaciones-Comerciales/ventas">
                <div className="p-5 border border-gray-200 hover:border-gray-300 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer h-full">
                  <Receipt className="w-8 h-8 text-emerald-600 mb-3" />
                  <p className="font-medium">Ventas del Día</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Reporte detallado
                  </p>
                </div>
              </Link>

              <Link href="/dashboard/inventario/movimientos_inventario">
                <div className="p-5 border border-gray-200 hover:border-gray-300 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer h-full">
                  <Clock className="w-8 h-8 text-purple-600 mb-3" />
                  <p className="font-medium">Movimientos Stock</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Control de inventario
                  </p>
                </div>
              </Link>

              <Link href="/dashboard/Administracion/usuarios">
                <div className="p-5 border border-gray-200 hover:border-gray-300 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer h-full">
                  <Users className="w-8 h-8 text-amber-600 mb-3" />
                  <p className="font-medium">Gestionar Usuarios</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Personal del restaurante
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
