'use client'
import { auth } from "@/app/config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Page() {

    const router = useRouter()

    function handleSubmit(e: any) {
        e.preventDefault()
        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value
        const repeat_password = e.currentTarget.repeat_password.value

        if (password !== repeat_password) alert('As senhas devem ser iguais')

        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                // @ts-ignore
                const jwt = res.user.accessToken

                document.cookie = ''

                router.push('/')
            })
            .catch(e => {
                console.log(e)
                alert(`Erro ao tentar entrar: ${e.message}`)
            })
    }

    return (
        <main className="h-screen w-screen bg-secondary flex justify-center items-center text-white flex-col">
            <Image unoptimized width={100} height={100} src="/luna.png" alt="luna logo" />
            <h1 className="text-3xl">Faça seu cadastro</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-96">
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Email</label>
                    <input className="text-black p-2 rounded-md" name="email" placeholder="insira seu email" type="email" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Senha</label>
                    <input className="text-black p-2 rounded-md" name="password" placeholder="insira sua senha" type="password" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Repetir senha</label>
                    <input className="text-black p-2 rounded-md" name="repeat_password" placeholder="insira sua senha" type="password" />
                </div>
                <button className="bg-primary p-2 text-black rounded-md transition-all hover:scale-105">Registrar</button>
                <Link href="/login" className=" text-white mt-5 text-sm">
                    Já possui uma conta? Clique
                    <span className="underline text-primary">&nbsp;aqui&nbsp;</span>
                    para entrar
                </Link>
            </form>
        </main>
    )
}