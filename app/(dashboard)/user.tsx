'use client';
import { Button } from '@/components/ui/button';
// import { auth, signOut } from '@/lib/auth';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function User() {
  // let session = await auth();
  // let user = session?.user;
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('session');
    document.cookie = "token=; Max-Age=0; path=/"; // elimina cookie
    router.push('/login');
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={'/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/configuracion">
          <DropdownMenuItem>Configuración</DropdownMenuItem>
        </Link>
        {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        {/* {user ? (
          <DropdownMenuItem>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </DropdownMenuItem>
        ) : ( */}
        <DropdownMenuItem asChild>
          <button onClick={handleLogout} className="cursor-pointer hover:bg-red-200 w-full text-left">
            Cerrar sesión
          </button>
        </DropdownMenuItem>
        {/* )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
