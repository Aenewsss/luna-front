'use client'
import { auth } from "@/app/config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bounce, toast, ToastContainer } from "react-toastify"

export default function Page() {

    const router = useRouter()

    function handleSubmit(e: any) {
        e.preventDefault()

        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                // @ts-ignore
                document.cookie = `auth-token=${res.user.accessToken}`

                router.push('/')
            })
            .catch(_ => {
                toast.error('Erro ao tentar entrar!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            })
    }

    return (
        <main className="h-[90vh] w-screen flex justify-center items-center text-white flex-col gap-6">
            <div className="flex gap-4 items-center">
                <Image unoptimized width={100} height={100} src="/luna.png" alt="luna logo" />
                <h1 className="text-[#C6FF81] font-semibold text-3xl">LUNA, SUA ASSISTENTE VIRTUAL</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-96 bg-[#1D1D1D] rounded-lg p-5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Email</label>
                    <input className="border-primary border text-black p-2 rounded-2xl" name="email" placeholder="luna@email.com" type="email" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Senha</label>
                    <input className="border-primary border text-black p-2 rounded-2xl" name="password" placeholder="******" type="password" />
                    <Link href="/esqueci-minha-senha" className="underline text-primary text-sm">Esqueci minha senha</Link>
                </div>
                <button className="bg-primary p-2 text-black rounded-2xl transition-all hover:scale-105">Entrar</button>
                <Link href="/registrar" className=" text-white mt-5 text-sm">
                    Ainda não possui uma conta? Clique
                    <span className="underline text-primary">&nbsp;aqui&nbsp;</span>
                    para criar
                </Link>
            </form>
            <ToastContainer />

        </main>
    )
}