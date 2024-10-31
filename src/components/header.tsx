'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "./modal";
import { get, ref, set } from "firebase/database"
import { auth, database } from "@/app/config/firebase";
import { v4 as uuidv4 } from 'uuid';
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { TaskStatusEnum } from "@/enums/task-status.enum";

export default function Header() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([{ time: 0, frequence: 'day' }]);

  async function handleSubmit(e: any) {
    e.preventDefault()

    const title = e.currentTarget.title.value
    const description = e.currentTarget.description.value
    const repeat = e.currentTarget.repeat.value

    if (!repeat) return toast.warning('A tarefa se repete?', {
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

    const currentUser = auth.currentUser
    if (!currentUser) return

    console.log(currentUser)
    const dbRef = ref(database, `tasks/${currentUser.uid}/${uuidv4()}`)
    const userRef = ref(database, `users/${currentUser.uid}`)

    const user = await get(userRef)
    console.log(user.val())
    const { phone } = user.val()

    set(dbRef, {
      title, description, phone: 55 + phone, status: TaskStatusEnum.TO_DO, notifications,
      email: currentUser!.email, createdAt: new Date().toISOString(), repeat
    })
      .then(_ => {
        setIsModalOpen(false)
        setTimeout(() => {

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
        }, 300);
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

  console.log(notifications)

  return (
    <div className="flex justify-between items-center">
      <button onClick={() => setIsModalOpen(true)} className="bg-primary text-black px-4 py-2 rounded-2xl flex gap-2 items-center transition-all hover:scale-105">
        <Image width={16} height={16} src="/icons/plus.svg" alt="+" />
        Nova Tarefa
      </button>

      <Modal title="Adicionar Nova Tarefa" isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false)
        router.push('/')
      }}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <input placeholder="Adicionar título" required name="title" className="rounded-xl bg-secondary p-2" type="text" />
            </div>
            <div className="flex gap-4">
              <input required name="title" className="rounded-xl bg-secondary p-2 flex-grow" type="datetime-local" />
              <select className="rounded-xl bg-secondary p-2" name="repeat">
                <option defaultChecked value="">Repete?</option>
                <option value={"yes"}>Sim</option>
                <option value={"no"}>Não</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <textarea rows={3} placeholder="Descrição" required name="description" className="rounded-xl bg-secondary p-3"></textarea>
            </div>
            {notifications.map((el, index) => <div key={index} className="flex justify-between">
              <div className="flex gap-4 items-center max-w-80">
                <div className="flex gap-2">
                  <Image src="/icons/bell.svg" width={16} height={16} alt="Notificação" />
                  <span className="rounded-xl bg-secondary p-2 text-gray-500 pointer-events-none">Notificação</span>
                </div>

                <input onChange={e => setNotifications(notifications.map((el, idx) => idx == index ? { ...el, time: Number(e.target.value) } : el))}
                  value={el.time || ''} placeholder="" required name="time"
                  className="rounded-xl bg-secondary p-2 max-w-16" type="number" />

                <select
                  onChange={e => setNotifications(notifications.map((el, idx) => idx == index ? { ...el, frequence: e.target.value } : el))}
                  value={el.frequence} required name="frequence" className="rounded-xl bg-secondary p-2 flex-grow">
                  <option value="day">Dia(s)</option>
                  <option value="hour">Hora(s)</option>
                  <option value="minute">Minuto(s)</option>
                </select>

              </div>
              {notifications.length > 1 && <Image onClick={_ => setNotifications(notifications.filter((_, idx) => idx != index))} className="cursor-pointer" src="/icons/trash.svg" width={20} height={20} alt="Lixeira" />}
            </div>)}

            <span onClick={_ => setNotifications([...notifications, { time: 0, frequence: 'day' }])} className="cursor-pointer w-fit text-primary text-base font-semibold">Adicionar Nova Notificação</span>
          </div>

          <div className="flex gap-2 justify-end mt-10">
            <button type="submit" className="bg-primary text-black px-6 transition-all hover:scale-105 py-2 mt-4 rounded-2xl">
              Salvar
            </button>
            <button type="button" className="border border-primary text-white px-6 transition-all hover:scale-105 py-2 mt-4 rounded-2xl" onClick={() => {
              setIsModalOpen(false)
              router.push('/')
            }}>
              Cancelar
            </button>
          </div>
        </form>
        <ToastContainer />
      </Modal >

    </div >
  );
}
