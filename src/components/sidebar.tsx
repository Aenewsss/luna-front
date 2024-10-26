'use client'

import { auth } from "@/app/config/firebase";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {

  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    document.cookie = `auth-token=;`
    router.push('/login')
  }

  return (
    <div className="flex flex-col items-center">
      <img
        src="/luna.png"
        alt="Avatar"
        className="w-12 h-12 rounded-full mb-6"
      />
      <nav className="flex flex-col justify-between items-center h-full">
        <div className="flex flex-col gap-6 items-center">
          <Link href="/" className={`${pathname == '/' && 'bg-[#4169e114] p-2 rounded-lg'} transition-all hover:scale-110`}>
            <Image width={24} height={24} src={`/icons/home${pathname == '/' && '-selected'}.svg`} alt="home" />
          </Link>
          <div className="cursor-not-allowed">
            <Link href="/tarefas" className={`${pathname == '/tarefas' && 'bg-[#4169e114] p-2 rounded-lg'} transition-all hover:scale-110 pointer-events-none`}>
              <Image width={24} height={24} src={`/icons/task${pathname == '/tarefas' ? '-selected' : ''}.svg`} alt="task" />
            </Link>
          </div>
          <div className="cursor-not-allowed">
            <Link href="/calendario" className={`${pathname == '/calendario' && 'bg-[#4169e114] p-2 rounded-lg'} transition-all hover:scale-110 pointer-events-none`}>
              <Image width={24} height={24} src={`/icons/calendar${pathname == '/calendario' ? '-selected' : ''}.svg`} alt="calendar" />
            </Link>
          </div>
        </div>
        <Image onClick={logout} className="transition-all hover:scale-110 cursor-pointer" width={24} height={24} src={`/icons/logout.svg`} alt="logout" />
      </nav>
    </div>
  );
}