'use client'

import Calendar from "@/components/calendar";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import TaskList from "@/components/taskList";
import TaskSummary from "@/components/taskSummary";
import { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { auth, database } from "./config/firebase";
import { get, ref } from "firebase/database";
import { TaskStatusEnum } from "@/enums/task-status.enum";

export default function Home() {

  const [tasksStatus, setTasksStatus] = useState({ TO_DO: 0, DONE: 0, CANCELLED: 0 });

  useEffect(() => {
    async function getData() {
      auth.onAuthStateChanged(user => {
        if (user) {
          const dbRef = ref(database, `tasks/${user?.uid}`)

          get(dbRef)
            .then(res => {
              let tasks = res.val()
              tasks = Object.entries(tasks).map(([key, value]: any) => ({ ...value, _id: key }))

              const TO_DO = tasks.reduce((acc: any, curr: any) => {
                if (curr.status == TaskStatusEnum.TO_DO) acc += 1
                return acc
              }, 0)
              const DONE = tasks.reduce((acc: any, curr: any) => {
                if (curr.status == TaskStatusEnum.DONE) acc += 1
                return acc
              }, 0)
              const CANCELLED = tasks.reduce((acc: any, curr: any) => {
                if (curr.status == TaskStatusEnum.CANCELLED) acc += 1
                return acc
              }, 0)

              setTasksStatus({CANCELLED, TO_DO, DONE})
              
            })
        }
      })

    }

    getData()
  }, []);

  return (
    <Suspense>
      <div className="min-h-96 text-white flex flex-col m-12 rounded-3xl relative z-10 p-10 gap-10">
        <div className="flex gap-10">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <div className="flex gap-6 mt-6 flex-wrap">
              <TaskSummary title="Tarefas Futuras" value={tasksStatus.TO_DO} color="yellow-400" icon="to-do" />
              <TaskSummary title="Tarefas Resolvidas" value={tasksStatus.DONE} color="green-400" icon="done" />
              <TaskSummary title="Tarefas Canceladas" value={tasksStatus.CANCELLED} color="red-400" icon="canceled" />
            </div>
            <div className="flex gap-6 mt-6">
              <TaskList />
              <Calendar />
            </div>
          </div>
        </div>

        <div
          className={`absolute bg-gradient-to-b from-green-400 to-[#1BAFA9] p-12 rounded-full shadow-xl top-0 left-0 pointer-events-none`}
          style={{
            filter: 'blur(100px)',
          }}
        ></div>

        <div
          className={`absolute bg-[#AF621B] p-8 rounded-t-full shadow-xl bottom-20 left-10 z-0 pointer-events-none`}
          style={{
            filter: 'blur(80px)',
          }}
        ></div>
        <ToastContainer />
      </div>
    </Suspense>

  );
}