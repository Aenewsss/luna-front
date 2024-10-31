'use client'
import { auth, database } from "@/app/config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { ref, set } from "firebase/database"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Bounce, toast, ToastContainer } from "react-toastify"

export default function Page() {

    const router = useRouter()

    const [phone, setPhone] = useState('');

    function formatPhone(e: any) {
        let { value } = e.target

        value = value.replace(/\D/g, '');

        if (value.length == 12) return

        if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        if (value.length > 9) value = `${value.slice(0, 10)}-${value.slice(10)}`;

        setPhone(value)
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value
        const repeat_password = e.currentTarget.repeat_password.value

        if (password !== repeat_password) alert('As senhas devem ser iguais')

        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                const dbRef = ref(database, `users/${res.user.uid}`)
                set(dbRef, {
                    phone: formatPhoneToDb(phone)
                })
                // @ts-ignore
                document.cookie = `auth-token=${res.user.accessToken}`
                router.push('/')
            })
            .catch(_ => {
                toast.error('Erro ao tentar registrar!', {
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

    function formatPhoneToDb(phone: string) {
        return phone.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '')
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
                    <input className="text-black p-2 rounded-2xl border-2 border-primary" name="email" placeholder="luna@email.com" type="email" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">WhatsApp</label>
                    <input onChange={formatPhone} value={phone} className="text-black p-2 rounded-2xl border-2 border-primary" name="phone" placeholder="(61) 99263-4979" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Senha</label>
                    <input className="text-black p-2 rounded-2xl border-2 border-primary" name="password" placeholder="*****" type="password" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Repetir senha</label>
                    <input className="text-black p-2 rounded-2xl border-2 border-primary" name="repeat_password" placeholder="*****" type="password" />
                </div>
                <button className="bg-primary p-2 text-black rounded-2xl transition-all hover:scale-105">Registrar</button>
                <Link href="/login" className=" text-white mt-5 text-sm">
                    Já possui uma conta? Clique
                    <span className="underline text-primary">&nbsp;aqui&nbsp;</span>
                    para entrar
                </Link>
            </form>
            <ToastContainer />
        </main>
    )
}