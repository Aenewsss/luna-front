'use client'
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/app/config/firebase"

export default function Page() {

    const router = useRouter()

    function handleSubmit(e: any) {
        e.preventDefault()

        const email = e.currentTarget.email.value

        sendPasswordResetEmail(auth, email, {
            url: process.env.NODE_ENV == 'development'
                ? process.env.NEXT_PUBLIC_FORGOT_PASSWORD_LINK_DEV as string
                : process.env.NEXT_PUBLIC_FORGOT_PASSWORD_LINK as string
        })
            .then(res => {
                console.log(res)
                // router.push('/')
            })
            .catch(e => {
                alert(`Erro ao tentar entrar: ${e.message}`)
            })
    }

    return (
        <main className="h-screen w-screen bg-secondary flex justify-center items-center text-white flex-col">
            <Image unoptimized width={100} height={100} src="/luna.png" alt="luna logo" />
            <h1 className="text-3xl">Recuperar senha</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-96">
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Email</label>
                    <input className="text-black p-2 rounded-md" name="email" placeholder="insira seu email" type="email" />
                </div>
                <button className="bg-primary p-2 text-black rounded-md transition-all hover:scale-105">Enviar</button>
                <Link href="/login" className="underline text-primary mb-2 text-sm">Entrar</Link>
            </form>
        </main>
    )
}