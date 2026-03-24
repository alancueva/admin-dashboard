'use client';
import { useState } from 'react';
import {
  Utensils,
  Users,
  Receipt,
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardRestaurante() {
  const [usuario] = useState('Alan Cueva');

  const stats = [
    {
      title: 'Mesas Ocupadas',
      value: '8',
      icon: Users,
      color: 'bg-red-500'
    },
    {
      title: 'Pedidos Activos',
      value: '15',
      icon: ShoppingCart,
      color: 'bg-orange-500'
    },
    {
      title: 'Ventas del Día',
      value: 'S/. 1,250',
      icon: Receipt,
      color: 'bg-green-500'
    },
    {
      title: 'Mesas Libres',
      value: '5',
      icon: Utensils,
      color: 'bg-blue-500'
    }
  ];

  const pedidos = [
    { id: 1, mesa: 'Mesa 1', estado: 'en_preparacion', total: 'S/. 45.00' },
    { id: 2, mesa: 'Mesa 3', estado: 'listo', total: 'S/. 80.00' },
    { id: 3, mesa: 'Mesa 5', estado: 'abierto', total: 'S/. 25.00' }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'abierto':
        return 'bg-gray-100 text-gray-700';
      case 'en_preparacion':
        return 'bg-yellow-100 text-yellow-700';
      case 'listo':
        return 'bg-green-100 text-green-700';
      case 'entregado':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* HEADER */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Restaurante</h1>
          <p className="text-sm text-gray-500">Bienvenido {usuario}</p>
        </div>

        {/* BOTÓN PRINCIPAL */}
        <Link href="/dashboard/operaciones-de-servicio/pedidos">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <PlusCircle className="w-4 h-4" />
            Nuevo Pedido
          </button>
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="text-xl font-bold">{stat.value}</h2>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* PEDIDOS ACTIVOS */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Pedidos Activos</h2>
          <Link href="/dashboard/operaciones-de-servicio/historial-pedido">
            <button className="text-blue-600 text-sm flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="space-y-3">
          {pedidos.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{p.mesa}</p>
                <p className="text-xs text-gray-500">Pedido #{p.id}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 text-xs rounded ${getEstadoColor(p.estado)}`}
                >
                  {p.estado}
                </span>

                <span className="font-semibold">{p.total}</span>

                <Link
                  href={`/dashboard/operaciones-de-servicio/historial-pedido/detalle-pedido/${p.id}`}
                >
                  <button className="text-blue-600 text-sm">Ver</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACCIONES RÁPIDAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Link href="/dashboard/Catalogo/mesa">
          <div className="bg-white p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-2">
              <Utensils />
              <span>Gestionar Mesas</span>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/Catalogo/menu">
          <div className="bg-white p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-2">
              <ShoppingCart />
              <span>Ver Menú</span>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/Operaciones-Comerciales/ventas">
          <div className="bg-white p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-2">
              <Receipt />
              <span>Ver Ventas</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
