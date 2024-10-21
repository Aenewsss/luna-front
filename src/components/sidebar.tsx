'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col items-center">
      <img
        src="/luna.png"
        alt="Avatar"
        className="w-12 h-12 rounded-full mb-6"
      />
      <nav className="flex flex-col gap-6 items-center">
        <Link href="/" className={`${pathname == '/' && 'bg-[#4169e114] p-2 rounded-lg'} transition-all hover:scale-110`}>
          <Image width={24} height={24} src={`/icons/home${pathname == '/' && '-selected'}.svg`} alt="home" />
        </Link>
        <Link href="/tarefas" className={`${pathname == '/tarefas' && 'bg-[#4169e114] p-2 rounded-lg'} transition-all hover:scale-110`}>
          <Image width={24} height={24} src={`/icons/task${pathname == '/tarefas' ? '-selected': ''}.svg`} alt="task" />
        </Link>
        <Link href="/calendario" className={`${pathname == '/calendario' && 'bg-[#4169e114] p-2 rounded-lg'} transition-all hover:scale-110`}>
          <Image width={24} height={24} src={`/icons/calendar${pathname == '/calendario' ? '-selected' : ''}.svg`} alt="calendar" />
        </Link>
      </nav>
    </div>
  );
}