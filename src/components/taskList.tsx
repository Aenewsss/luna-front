'use client'
import { auth, database } from "@/app/config/firebase";
import { get, ref } from "firebase/database";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function TaskList() {

  const router = useRouter()

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getData() {
      auth.onAuthStateChanged(user => {
        if (user) {
          const dbRef = ref(database, `tasks/${user?.uid}`)

          get(dbRef)
            .then(res => {
              let tasks = res.val()
              tasks = Object.entries(tasks).map(([key, value]: any) => ({ ...value, _id: key }))
              setTasks(tasks)
            })
            .catch(_ => toast.info('Nenhum tarefa cadastrada. Clique aqui para adicionar!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              onClick: () => {
                router.push('/?taskModal=true')
              }
            }))
        }
      })

    }

    getData()
  }, []);


  return (
    <div className="bg-secondary p-4 rounded-lg shadow-lg overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="text-primary bg-[#262525] uppercase">
            <th align="left" className="rounded-s-lg p-2">Título</th>
            <th align="left">Descrição</th>
            <th align="left" className="rounded-e-lg">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task: any, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                {/* <button className="text-yellow-400 hover:text-yellow-300">✏️</button> */}
                <button className="cursor-not-allowed text-red-400 hover:text-red-300 ml-2 mt-2">
                  <Image width={16} height={16} src="/icons/check-square.svg" alt="check" />
                </button>
                <button className="cursor-not-allowed text-red-400 hover:text-red-300 ml-2 mt-2">❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}