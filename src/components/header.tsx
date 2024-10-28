'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "./modal";
import { get, ref, set } from "firebase/database"
import { auth, database } from "@/app/config/firebase";
import { v4 as uuidv4 } from 'uuid';
import { Bounce, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault()

    const title = e.currentTarget.title.value
    const description = e.currentTarget.description.value
    const time = e.currentTarget.time.value
    const frequence = e.currentTarget.frequence.value

    const currentUser = auth.currentUser
    if (!currentUser) return

    const dbRef = ref(database, `tasks/${currentUser.uid}/${uuidv4()}`)
    const userRef = ref(database, `users/${currentUser.uid}`)

    const user = await get(userRef)
    const { phone } = user.val()

    set(dbRef, {
      title, description, frequence, phone: '55'+phone, time,
      email: currentUser!.email, createdAt: new Date().toISOString()
    })
      .then(_ => {
        setIsModalOpen(false)
        toast.success('🌖 Tarefa criada!', {
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
      .catch(_ => toast.error('Erro ao criar tarefa!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }))
  }

  useEffect(() => {
    if (searchParams.get('taskModal')) setIsModalOpen(true)
  }, [searchParams]);

  return (
    <div className="flex justify-between items-center">
      <button onClick={() => setIsModalOpen(true)} className="bg-primary text-black px-4 py-2 rounded-2xl flex gap-2 items-center transition-all hover:scale-105">
        <Image width={16} height={16} src="/icons/plus.svg" alt="+" />
        Nova Tarefa
      </button>

      <Modal title="Adicionar tarefa" isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false)
        router.push('/')
      }}>
        <form onSubmit={handleSubmit}>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Título da tarefa</label>
              <input required name="title" className="rounded-md bg-gray-700 p-2" type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Descrição</label>
              <input required name="description" className="rounded-md bg-gray-700 p-2" type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Com qual frequência quer ser lembrado?</label>
              <div className="flex gap-2 items-center">
                <span className="text-lg font-medium">A cada</span>
                <input required name="time" className="rounded-md bg-gray-700 p-2" type="number" />
                <select required name="frequence" className="rounded-md bg-gray-700 p-2 flex-grow">
                  <option defaultChecked value="day">Dia(s)</option>
                  <option value="hour">Hora(s)</option>
                  <option value="minute">Minuto(s)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="button" className="bg-red-400 text-white px-4 transition-all hover:scale-105 py-2 mt-4 rounded" onClick={() => {
              setIsModalOpen(false)
              router.push('/')
            }}>
              Cancelar
            </button>
            <button type="submit" className="bg-primary text-black px-4 transition-all hover:scale-105 py-2 mt-4 rounded">
              Salvar
            </button>
          </div>
        </form>
      </Modal >
    </div >
  );
}
