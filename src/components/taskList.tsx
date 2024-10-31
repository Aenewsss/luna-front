'use client'
import { auth, database } from "@/app/config/firebase";
import { get, onValue, ref } from "firebase/database";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function TaskList() {

  const router = useRouter()

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let unsubscribeAuth // Track auth state listener
    let unsubscribeDb: any // Track database listener

    function listenToDatabaseChanges(userId: string) {
      const dbRef = ref(database, `tasks/${userId}`);

      // Real-time listener for changes in the database
      unsubscribeDb = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const taskList = Object.entries(data).map(([key, value]) => ({
            ...value!,
            _id: key,
          }));
          setTasks(taskList as any);
        } else {
          setTasks([]);
        }
      });
    }

    function fetchTasks(userId: string) {
      const dbRef = ref(database, `tasks/${userId}`);

      get(dbRef)
        .then((res) => {
          const data = res.val();
          if (data) {
            const taskList = Object.entries(data).map(([key, value]) => ({
              ...value!,
              _id: key,
            }));
            setTasks(taskList as any);
          } else {
            toast.info(
              'Nenhuma tarefa cadastrada. Clique aqui para adicionar!',
              {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
                onClick: () => {
                  router.push('/?taskModal=true');
                },
              }
            );
          }
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }

    unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        listenToDatabaseChanges(user.uid);
        fetchTasks(user.uid); // Fetch tasks initially
      } else {
        setTasks([]); // Clear tasks if user logs out
      }
    });

    // Cleanup function to remove listeners on unmount
    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeDb) unsubscribeDb();
    };
  }, []);

  function handleTaskDone(id: string) {
    // const dbRef = ref(database, `tasks/${userId}`);

  }
  function handleTaskCancel(id: string) {
    // const dbRef = ref(database, `tasks/${userId}`);

  }

  return (
    <div className="bg-secondary p-4 rounded-lg shadow-lg overflow-auto flex-grow">
      <table className="w-full">
        <thead>
          <tr className="text-primary bg-[#262525] uppercase shadow-lg">
            <th align="left" className="rounded-s-xl p-2">Título</th>
            <th align="left">Data</th>
            <th align="left">Hora</th>
            <th align="left">Repete</th>
            <th align="left" className="rounded-e-xl"></th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task: any, index) => (
            <tr key={index} className="border-b border-gray-700 h-14">
              <td>{task.title}</td>
              <td>{new Date(task.createdAt).toLocaleDateString('pt-BR')}</td>
              <td>{new Date(task.createdAt).toLocaleTimeString('pt-BR')}</td>
              <td>{task.repeat == 'yes' ? 'SIM' : 'NÃO'}</td>
              <td>
                <div className="flex gap-2 items-center">
                  {/* <button className="text-yellow-400 hover:text-yellow-300">✏️</button> */}
                  <Image onClick={_ => handleTaskDone(task._id)} className="cursor-pointer" width={16} height={16} src="/icons/done.svg" alt="check" />
                  <Image onClick={_ => handleTaskCancel(task._id)} className="cursor-pointer" width={16} height={16} src="/icons/cancel.svg" alt="cancel" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}