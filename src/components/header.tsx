'use client'
import Image from "next/image";
import { useState } from "react";
import Modal from "./modal";
import { ref, set } from "firebase/database"
import { auth, database } from "@/app/config/firebase";
import { v4 as uuidv4 } from 'uuid';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault()

    const title = e.currentTarget.title.value
    const description = e.currentTarget.description.value
    const frequence = e.currentTarget.frequence.value
    const phone = e.currentTarget.phone.value

    const currentUser = auth.currentUser

    const dbRef = ref(database, `tasks/${uuidv4()}`)

    set(dbRef, {
      title, description, frequence, phone, email: currentUser!.email
    })
      .then(res => alert('Tarefa criada'))
      .catch(e => alert(`Erro ao criar tarefa: ${e.message}`))

  }

  function formatPhone(e: any) {
    let { value } = e.target

    value = value.replace(/\D/g, '');

    if (value.length == 12) return

    if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 9) value = `${value.slice(0, 10)}-${value.slice(10)}`;

    setPhone(value)
  }

  return (
    <div className="flex justify-between items-center">
      <button onClick={() => setIsModalOpen(true)} className="bg-primary text-black px-4 py-2 rounded-2xl flex gap-2 items-center transition-all hover:scale-105">
        <Image width={16} height={16} src="/icons/plus.svg" alt="+" />
        Nova Tarefa
      </button>

      <Modal title="Adicionar tarefa" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
              <select required name="frequence" className="rounded-md bg-gray-700 p-2">
                <option defaultChecked value="everyday">Todo dia</option>
                <option value="every_hour">Toda hora</option>
                <option value="every_30">A cada 30 minutos</option>
                <option value="every_20">A cada 20 minutos</option>
                <option value="every_10">A cada 10 minutos</option>
                <option value="every_5">A cada 5 minutos</option>
                <option value="every_1">A cada 1 minuto (usar somente em teste)</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">WhatsApp</label>
              <input value={phone} onChange={formatPhone} placeholder="Insira seu número do WhatsApp" required name="phone" className="rounded-md bg-gray-700 p-2" type="text" />
            </div>
          </div>

          <div className="flex gap-4">
            <button type="button" className="bg-red-400 text-white px-4 transition-all hover:scale-105 py-2 mt-4 rounded" onClick={() => setIsModalOpen(false)}>
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