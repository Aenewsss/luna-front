'use client'
import { auth } from "@/app/config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Page() {

    const router = useRouter()

    function handleSubmit(e: any) {
        e.preventDefault()

        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                console.log(res)
                router.push('/')
            })
            .catch(e => {
                alert(`Erro ao tentar entrar: ${e.message}`)
            })
    }

    return (
        <main className="h-screen w-screen bg-secondary flex justify-center items-center text-white flex-col">
            <Image unoptimized width={100} height={100} src="/luna.png" alt="luna logo" />
            <h1 className="text-3xl">Faça seu login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-96">
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Email</label>
                    <input className="text-black p-2 rounded-md" name="email" placeholder="insira seu email" type="email" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Senha</label>
                    <input className="text-black p-2 rounded-md" name="password" placeholder="insira sua senha" type="password" />
                    <Link href="/esqueci-minha-senha" className="underline text-primary text-sm">Esqueci minha senha</Link>
                </div>
                <button className="bg-primary p-2 text-black rounded-md transition-all hover:scale-105">Entrar</button>
                <Link href="/registrar" className=" text-white mt-5 text-sm">
                    Ainda não possui uma conta? Clique
                    <span className="underline text-primary">&nbsp;aqui&nbsp;</span>
                    para criar
                </Link>
            </form>
        </main>
    )
}