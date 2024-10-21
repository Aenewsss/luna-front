'use client'
import Image from "next/image";
import { useState } from "react";
import Modal from "./modal";
import taskService from "@/services/task.service";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault()

    const form = new FormData()

    form.append('title', e.currentTarget.title.value)
    form.append('description', e.currentTarget.description.value)
    form.append('frequence', e.currentTarget.frequence.value)

    await taskService.register(form)
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
                <option value="every_15">A cada 15 minutos</option>
              </select>
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