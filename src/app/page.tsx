import Calendar from "@/components/calendar";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import TaskList from "@/components/taskList";
import TaskSummary from "@/components/taskSummary";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="min-h-96 bg-[#262525] text-white flex flex-col m-12 rounded-3xl relative z-10 p-10 gap-10">
      <div className="flex gap-10">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="flex gap-6 mt-6 flex-wrap">
            <TaskSummary title="Tarefas Futuras" value={30} color="yellow-400" icon="to-do" />
            <TaskSummary title="Tarefas Resolvidas" value={412} color="green-400" icon="done" />
            <TaskSummary title="Tarefas Canceladas" value={18} color="red-400" icon="canceled" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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

      <Footer />
    </div>
  );
}