'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ChefHat,
  Clock,
  CheckCircle,
  Play,
  AlertTriangle,
  Bell,
  Utensils,
  Maximize2,
  Trash2,
  Layers,
  Sparkles,
  Smartphone,
  RotateCcw,
  Plus
} from 'lucide-react';

const PLATOS_POOL = [
  {
    id: 1,
    nombre: 'Ceviche Clásico',
    categoria: 'entradas',
    color: 'from-blue-400 to-cyan-500',
    nota: 'Sin ají para los niños'
  },
  {
    id: 2,
    nombre: 'Lomo Saltado',
    categoria: 'fondos',
    color: 'from-amber-600 to-red-700',
    nota: 'Bien jugoso, papas crujientes'
  },
  {
    id: 3,
    nombre: 'Anticuchos de Corazón',
    categoria: 'entradas',
    color: 'from-orange-500 to-rose-600',
    nota: 'Con doble porción de choclo'
  },
  {
    id: 4,
    nombre: 'Chicha Morada 1L',
    categoria: 'bebidas',
    color: 'from-purple-800 to-indigo-950',
    nota: 'Helada'
  },
  {
    id: 5,
    nombre: 'Suspiro a la Limeña',
    categoria: 'postres',
    color: 'from-yellow-400 to-amber-600',
    nota: 'Poco merengue'
  },
  {
    id: 6,
    nombre: 'Arroz con Mariscos',
    categoria: 'fondos',
    color: 'from-amber-500 to-orange-500',
    nota: 'Extra queso parmesano encima'
  }
];

type OrderItemStatus = 'Enviado' | 'En Preparación' | 'Listo' | string;

interface OrderItem {
  id: number;
  nombre: string;
  cantidad: number;
  categoria: string;
  note?: string;
  status: OrderItemStatus;
}

interface Order {
  id: number;
  tableId: number;
  orderTime: Date;
  items: OrderItem[];
  displayedItems?: OrderItem[];
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 3,
    tableId: 3,
    orderTime: new Date(Date.now() - 1000 * 60 * 12), // Hace 12 minutos
    items: [
      {
        id: 1,
        nombre: 'Ceviche Clásico',
        cantidad: 2,
        categoria: 'entradas',
        note: 'Sin ají y cebolla cortada muy fina',
        status: 'En Preparación'
      },
      {
        id: 3,
        nombre: 'Anticuchos de Corazón',
        cantidad: 1,
        categoria: 'entradas',
        note: 'Bien cocidos',
        status: 'Enviado'
      },
      {
        id: 4,
        nombre: 'Chicha Morada 1L',
        cantidad: 1,
        categoria: 'bebidas',
        note: 'Con bastante hielo',
        status: 'Listo'
      }
    ]
  },
  {
    id: 8,
    tableId: 8,
    orderTime: new Date(Date.now() - 1000 * 60 * 4), // Hace 4 minutos
    items: [
      {
        id: 2,
        nombre: 'Lomo Saltado',
        cantidad: 3,
        categoria: 'fondos',
        note: 'Término medio de la carne',
        status: 'Enviado'
      },
      {
        id: 5,
        nombre: 'Suspiro a la Limeña',
        cantidad: 2,
        categoria: 'postres',
        note: '',
        status: 'Enviado'
      }
    ]
  }
];

export default function KitchenApp() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeFilter, setActiveFilter] = useState('Todos'); // 'Todos' | 'Pendientes' | 'Preparando' | 'Listos'
  const [kitchenAlert, setKitchenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const alertTimeoutRef = useRef<number | null>(null);

  // Limpiar cualquier timeout pendiente al desmontar el componente
  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current !== null) {
        window.clearTimeout(alertTimeoutRef.current);
        alertTimeoutRef.current = null;
      }
    };
  }, []);

  // Efecto para actualizar el reloj general y forzar render de minutos transcurridos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const playKitchenBell = (type = 'inbound') => {
    try {
      // Obtener constructor de AudioContext de forma segura (soporte webkit prefijo)
      const AudioContextCtor = (window.AudioContext ??
        (window as any).webkitAudioContext) as
        | (new () => AudioContext)
        | undefined;
      if (!AudioContextCtor) throw new Error('AudioContext no disponible');
      const audioCtx = new AudioContextCtor();

      if (type === 'inbound') {
        // Tono agudo y alegre de orden entrante (Doble campana)
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(987.77, audioCtx.currentTime); // Si5
        gain1.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(
          0.001,
          audioCtx.currentTime + 0.6
        );
        osc1.start();
        osc1.stop(audioCtx.currentTime + 0.6);

        setTimeout(() => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1174.66, audioCtx.currentTime); // Re6
          gain2.gain.setValueAtTime(0.08, audioCtx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(
            0.001,
            audioCtx.currentTime + 0.5
          );
          osc2.start();
          osc2.stop(audioCtx.currentTime + 0.5);
        }, 120);
      } else {
        // Sonido grave de confirmación o despacho
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // Do5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          audioCtx.currentTime + 0.4
        );
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn(
        'Audio Context no inicializado o bloqueado por el navegador:',
        e
      );
    }
  };

  const triggerToast = (msg: string) => {
    setAlertMessage(msg);
    setKitchenAlert(true);
    if (alertTimeoutRef.current !== null) {
      window.clearTimeout(alertTimeoutRef.current);
    }
    alertTimeoutRef.current = window.setTimeout(() => {
      setKitchenAlert(false);
      alertTimeoutRef.current = null;
    }, 4500);
  };

  // Cambiar estado de un ítem individual de una orden
  const updateItemStatus = (
    orderId: number,
    itemIndex: number,
    nextStatus: OrderItemStatus
  ): void => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id !== orderId) return order;
        // Validar índice
        if (itemIndex < 0 || itemIndex >= order.items.length) return order;
        const newItems = order.items.map((it, idx) =>
          idx === itemIndex ? { ...it, status: nextStatus } : it
        );
        return { ...order, items: newItems };
      })
    );

    if (nextStatus === 'Listo') {
      playKitchenBell('ready');
    }
  };

  // Cambiar estado de todos los ítems de un ticket completo
  const updateEntireTicket = (
    orderId: number,
    nextStatus: OrderItemStatus
  ): void => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id !== orderId) return order;

        let targetStates: OrderItemStatus[] = [];
        if (nextStatus === 'En Preparación') {
          targetStates = ['Enviado'];
        } else if (nextStatus === 'Listo') {
          targetStates = ['Enviado', 'En Preparación'];
        }

        const newItems = order.items.map((item) => {
          if (targetStates.includes(item.status)) {
            return { ...item, status: nextStatus };
          }
          return item;
        });

        return { ...order, items: newItems };
      })
    );

    playKitchenBell('ready');
    triggerToast(`Mesa ${orderId} actualizado por completo a: ${nextStatus}`);
  };

  // Simular la llegada de un pedido del mesero
  const simulateIncomingOrder = (): void => {
    const randomTable = Math.floor(Math.random() * 12) + 1;
    const numItems = Math.floor(Math.random() * 2) + 1;
    const randomItems: OrderItem[] = [];

    for (let i = 0; i < numItems; i++) {
      const dish = PLATOS_POOL[Math.floor(Math.random() * PLATOS_POOL.length)];
      randomItems.push({
        id: dish.id,
        nombre: dish.nombre,
        cantidad: Math.floor(Math.random() * 2) + 1,
        categoria: dish.categoria,
        note: Math.random() > 0.4 ? dish.nota : '',
        status: 'Enviado'
      });
    }

    const newOrder: Order = {
      id: Math.floor(Math.random() * 800) + 100,
      tableId: randomTable,
      orderTime: new Date(),
      items: randomItems
    };

    setOrders((prev) => [newOrder, ...prev]);
    playKitchenBell('inbound');
    triggerToast(
      `🛎️ ¡Mesa ${randomTable} ha enviado un nuevo pedido a cocina!`
    );
  };

  // Limpiar/Despachar ticket terminado de la pantalla
  const clearTicket = (orderId: number): void => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    playKitchenBell('ready');
    triggerToast(`Mesa ${orderId} despachado e impreso en salida.`);
  };

  // Resetear simulador a estado inicial
  const resetSimulator = () => {
    setOrders(INITIAL_ORDERS);
    playKitchenBell('ready');
    triggerToast('Pantalla restablecida al estado original de prueba.');
  };

  const filteredOrders = useMemo(() => {
    return orders
      .map((order) => {
        // Filtrar los platos dentro de la tarjeta de acuerdo al filtro superior
        const displayedItems = order.items.filter((item) => {
          if (activeFilter === 'Pendientes') return item.status === 'Enviado';
          if (activeFilter === 'Preparando')
            return item.status === 'En Preparación';
          if (activeFilter === 'Listos') return item.status === 'Listo';
          return true; // 'Todos'
        });

        return { ...order, displayedItems };
      })
      .filter((order) => order.displayedItems.length > 0);
  }, [orders, activeFilter]);

  // Contadores generales para el Dashboard
  const stats = useMemo(() => {
    let pendientes = 0;
    let preparando = 0;
    let listos = 0;

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.status === 'Enviado') pendientes += item.cantidad;
        if (item.status === 'En Preparación') preparando += item.cantidad;
        if (item.status === 'Listo') listos += item.cantidad;
      });
    });

    return { pendientes, preparando, listos };
  }, [orders]);

  // Formateador de tiempo transcurrido
  const getMinutesElapsed = (time: string | number | Date): number => {
    // Aceptamos time como Date, número (timestamp) o string (ISO)
    const start = time instanceof Date ? time : new Date(time);
    // Usar getTime() para realizar operaciones aritméticas en number
    const diffMs = currentTime.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 1000 / 60);
    return diffMins;
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-800">
      {}
      <header className="bg-white border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0 shadow-sm z-30">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl border border-emerald-100 shadow-xs">
            <ChefHat size={22} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase">
                Pantalla de Cocina
              </h1>
              {/*<span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold px-2 py-0.5 rounded-md">
                KDS CLARO
              </span>*/}
            </div>
            <p className="text-xs text-slate-500">Comandas</p>
          </div>
        </div>

        {/* Acciones de Simulación */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={resetSimulator}
            title="Restablecer"
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all border border-slate-200"
          >
            <RotateCcw size={16} />
          </button>

          {/*<button
            onClick={simulateIncomingOrder}
            className="flex items-center gap-1.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-orange-100 border border-orange-600/10"
          >
            <Plus size={14} />
            Simular Pedido (Mesero)
          </button>*/}
        </div>
      </header>

      {}
      {kitchenAlert && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-3 max-w-sm w-11/12 sm:w-auto">
          <div className="bg-emerald-500/20 p-2 rounded-xl">
            <Bell size={16} className="text-emerald-400" />
          </div>
          <p className="text-xs font-bold text-slate-100 flex-1">
            {alertMessage}
          </p>
          <button
            onClick={() => setKitchenAlert(false)}
            className="text-slate-400 hover:text-white"
          >
            <span className="text-xs font-black">X</span>
          </button>
        </div>
      )}

      {}
      {/* Resumen / Métricas superiores
      <section className="bg-white border-b border-slate-200 px-4 py-2.5 sm:px-6 shrink-0 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span className="text-xs font-semibold text-slate-500">
            Pendientes:
          </span>
          <span className="text-xs font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-100">
            {stats.pendientes}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-xs font-semibold text-slate-500">
            Preparando:
          </span>
          <span className="text-xs font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-100">
            {stats.preparando}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-semibold text-slate-500">Listos:</span>
          <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">
            {stats.listos}
          </span>
        </div>
      </section>*/}

      {}
      {/* Filtros principales de pantalla */}
      <div className="bg-slate-100/50 p-4 border-b border-slate-200 shrink-0 flex items-center justify-between">
        <div className="flex bg-white border border-slate-200 p-1 rounded-xl w-full sm:w-auto overflow-x-auto no-scrollbar">
          {['Todos', 'Pendientes', 'Preparando', 'Listos'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/*<span className="hidden sm:inline text-xs font-black text-slate-400 uppercase tracking-wider">
          Total de tickets: {filteredOrders.length}
        </span>*/}
      </div>

      {/* CONTENEDOR PRINCIPAL DE COMANDAS */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-slate-100/30">
        {filteredOrders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 italic p-6">
            <div className="p-5 bg-white border border-slate-200 rounded-3xl mb-3 shadow-xs">
              <Utensils size={36} className="text-slate-300" />
            </div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 text-center">
              Sin comandas para mostrar
            </p>
            <p className="text-[11px] text-slate-400 mt-1 text-center">
              Intenta simular un pedido para poblar la pantalla de cocina.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-start">
            {}
            {filteredOrders.map((order) => {
              const minutesElapsed = getMinutesElapsed(order.orderTime);

              // Determinar la severidad del tiempo de espera
              const isUrgent = minutesElapsed >= 10;
              const isWarning = minutesElapsed >= 5 && minutesElapsed < 10;

              const totalItemsCount = order.items.length;
              const completedItemsCount = order.items.filter(
                (i) => i.status === 'Listo'
              ).length;
              const isEntireTicketFinished =
                completedItemsCount === totalItemsCount;
              const isSomePreparing = order.items.some(
                (i) => i.status === 'En Preparación'
              );

              return (
                <div
                  key={order.id}
                  className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${
                    isEntireTicketFinished
                      ? 'border-emerald-500/50 bg-emerald-50/10'
                      : isUrgent
                        ? 'border-rose-400/80 shadow-rose-100 ring-2 ring-rose-500/10'
                        : isWarning
                          ? 'border-amber-400/80'
                          : 'border-slate-200'
                  }`}
                >
                  {/* Cabecera del Ticket */}
                  <div
                    className={`p-4 border-b flex items-start justify-between ${
                      isEntireTicketFinished
                        ? 'bg-emerald-50/50 border-emerald-100'
                        : isUrgent
                          ? 'bg-rose-50/50 border-rose-100'
                          : isWarning
                            ? 'bg-amber-50/50 border-amber-100'
                            : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">
                          COMANDA
                        </span>
                        {/*<span className="text-[10px] font-black px-1.5 py-0.5 bg-slate-900 text-white rounded">
                          {order.id}
                        </span>*/}
                      </div>
                      <h3 className="text-lg font-black text-slate-900 mt-1">
                        MESA {order.tableId}
                      </h3>
                    </div>

                    <div className="flex flex-col items-end">
                      {/*<div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-2xs">
                        <Clock
                          size={12}
                          className={`${isUrgent ? 'text-rose-500 animate-spin' : isWarning ? 'text-amber-500' : 'text-slate-400'}`}
                        />
                        <span
                          className={`text-[11px] font-black ${isUrgent ? 'text-rose-600' : 'text-slate-700'}`}
                        >
                          {minutesElapsed} min
                        </span>
                      </div>*/}

                      {/*<span className="text-[9px] text-slate-400 font-bold mt-1">
                        Progreso: {completedItemsCount}/{totalItemsCount}
                      </span>*/}
                    </div>
                  </div>

                  {/* Cuerpo del Ticket con platos */}
                  <div className="p-4 space-y-4 divide-y divide-slate-100">
                    {order.displayedItems.map((item, idx) => {
                      // Obtener la posición real en el array completo para actualizar estado
                      const originalIndex = order.items.findIndex(
                        (i) =>
                          i.id === item.id &&
                          i.status === item.status &&
                          i.note === item.note
                      );

                      return (
                        <div
                          key={`${item.id}-${idx}`}
                          className={`pt-4 first:pt-0 flex flex-col ${
                            item.status === 'Listo' ? 'opacity-50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2.5">
                              <span className="bg-slate-100 border border-slate-200 text-slate-800 font-black text-sm w-7 h-7 flex items-center justify-center rounded-xl shrink-0 mt-0.5">
                                {item.cantidad}
                              </span>
                              <div>
                                <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                                  {item.nombre}
                                </h4>
                                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
                                  {item.categoria}
                                </span>
                              </div>
                            </div>

                            {/* Badge de estado del plato */}
                            <span
                              className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border ${
                                item.status === 'Listo'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : item.status === 'En Preparación'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                              }`}
                            >
                              {item.status === 'Enviado'
                                ? 'Pendiente'
                                : item.status}
                            </span>
                          </div>

                          {/* Notas o Alertas del Chef */}
                          {item.note && (
                            <div className="mt-2 bg-amber-50 border border-amber-200 p-2 rounded-xl flex items-start gap-2">
                              <AlertTriangle
                                size={13}
                                className="text-amber-600 shrink-0 mt-0.5"
                              />
                              <p className="text-[10px] text-amber-800 font-medium">
                                <strong className="font-bold">NOTA:</strong>{' '}
                                {item.note}
                              </p>
                            </div>
                          )}

                          {/* Botones de acción específicos de cada plato */}
                          {item.status !== 'Listo' && (
                            <div className="mt-2.5 flex gap-1.5 self-end">
                              {item.status === 'Enviado' ? (
                                <button
                                  onClick={() =>
                                    updateItemStatus(
                                      order.id,
                                      originalIndex,
                                      'En Preparación'
                                    )
                                  }
                                  className="bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-800 font-black text-[10px] uppercase px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all border border-amber-300/30"
                                >
                                  <Play size={10} fill="currentColor" /> Empezar
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    updateItemStatus(
                                      order.id,
                                      originalIndex,
                                      'Listo'
                                    )
                                  }
                                  className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-[10px] uppercase px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all border border-emerald-600/10"
                                >
                                  <CheckCircle size={10} /> Terminar
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Acciones del Ticket Completo */}
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex gap-2">
                    {isEntireTicketFinished ? (
                      <button
                        onClick={() => clearTicket(order.id)}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 transition-all shadow-sm shadow-emerald-100 border border-emerald-700/10"
                      >
                        <CheckCircle size={13} /> DESPACHAR / ENTREGAR
                      </button>
                    ) : (
                      <>
                        {!isSomePreparing &&
                          completedItemsCount < totalItemsCount && (
                            <button
                              onClick={() =>
                                updateEntireTicket(order.id, 'En Preparación')
                              }
                              className="w-full py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-1.5 transition-all shadow-xs border border-amber-600/10"
                            >
                              Preparar todo
                            </button>
                          )}
                        <button
                          onClick={() => updateEntireTicket(order.id, 'Listo')}
                          className="w-full py-2 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-1.5 transition-all shadow-xs"
                        >
                          Listo todo
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer minimalista adaptado a tablets/móviles */}
      <footer className="bg-white border-t border-slate-200 px-4 py-3 shrink-0 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Smartphone size={12} className="text-slate-300" />
          <span>Diseño Optimizado para Tablets de Cocina</span>
        </div>
        <span>Stokontrol</span>
      </footer>

      {/* Estilos para omitir scrollbar por defecto */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
}
