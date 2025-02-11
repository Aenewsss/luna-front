'use client'
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/app/config/firebase"
import { Bounce, toast, ToastContainer } from "react-toastify"

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
                toast.info('Senha enviada para o email!', {
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
            .catch(_ => {
                toast.error('Erro ao tentar recuperar senha!', {
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
                    <input className="text-black p-2 border-2 border-primary rounded-2xl" name="email" placeholder="luna@email.com" type="email" />
                </div>
                <button className="bg-primary p-2 text-black rounded-2xl transition-all hover:scale-105">Enviar</button>
                <Link href="/login" className="underline text-primary mb-2 text-sm">Entrar</Link>
            </form>
            <ToastContainer />
        </main>
    )
}