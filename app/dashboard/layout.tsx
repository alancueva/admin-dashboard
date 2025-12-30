'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
  ArrowLeftRight,
  BookText,
  ShieldPlus,
  File,
  SlidersVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import { User } from './user';
import { VercelLogo } from '@/components/icons';
import Providers from './providers';
import { NavItem } from './nav-item';
import DashboardBreadcrumb from './breadcrumb';
import { useState, useEffect } from 'react';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('session');
    const token = document.cookie.includes('token=');
    if (!session && !token) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <DashboardBreadcrumb />
            {/* <SearchInput /> */}
            <div className="ml-auto">
              <User />
            </div>
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}

function DesktopNav() {
   const navItems:any[] = [
    { href: '/dashboard', label: 'Inicio', icon: Home },
    { href: '/dashboard/Administracion', label: 'Administrativo', icon: ShieldPlus },
    { href: '/dashboard/Catalogo', label: 'Catálogo', icon: BookText },
    { href: '/dashboard/gestion-de-existencia', label: 'Gestión de Existenia', icon: Package },
    { href: '/dashboard/Operaciones-Comerciales', label: 'Operaciones Comerciales', icon: ArrowLeftRight },
    // { href: '#', label: 'Reporte', icon: File },
    // { href: '#', label: 'Control', icon: SlidersVertical },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <VercelLogo className="h-8 w-8 transition-all group-hover:scale-110" />
          <span className="sr-only">Stokontrol</span>
        </Link>
        {navItems.map((item) => (
          <NavItem key={item.href} href={item.href} label={item.label}>
            <item.icon className="h-5 w-5" />
          </NavItem>
        ))}

      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav() {
    const [open, setOpen] = useState(false);
  const nav:any[] = [
    { href: '/dashboard', label: 'Inicio', icon: Home },
    { href: '/dashboard/Administracion', label: 'Administrativo', icon: ShieldPlus },
    { href: '/dashboard/Catalogo', label: 'Catálogo', icon: Package },
    { href: '/dashboard/gestion-de-existencia', label: 'Gestión de Existenia', icon: Package },
    { href: '/dashboard/Operaciones-Comerciales', label: 'Operaciones Comerciales', icon: ArrowLeftRight },
    // { href: '#', label: 'Reporte', icon: File },
    // { href: '#', label: 'Control', icon: SlidersVertical },
  ];
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <VercelLogo className="h-10 w-10 transition-all group-hover:scale-110" />
          <span className="sr-only">Stokontrol</span>
          </Link>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <item.icon className="h-5 w-5" />
            {item.label}
            </Link>
          ))}
          
        </nav>
      </SheetContent>
    </Sheet>
  );
}

// function DashboardBreadcrumb() {
//   return (
//     <Breadcrumb className="hidden md:flex">
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href="#">Dashboard</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href="#">Products</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbPage>All Products</BreadcrumbPage>
//         </BreadcrumbItem>
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }
