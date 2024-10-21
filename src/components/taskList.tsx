import Image from "next/image";

export default function TaskList() {
  const tasks = [
    { description: 'Almoçar com minha mãe', date: new Date() },
    { description: 'Jogar Tênis', date: new Date() },
  ];

  return (
    <div className="bg-secondary p-4 rounded-lg shadow-lg">
      <table className="w-full">
        <thead>
          <tr className="text-primary bg-[#262525] uppercase">
            <th align="left" className="rounded-s-lg p-2">Descrição</th>
            <th align="left">Data</th>
            <th align="left">Hora</th>
            <th align="left" className="rounded-e-lg">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td>{task.description}</td>
              <td>{new Date(task.date).toLocaleDateString('pt-BR')}</td>
              <td>{new Date(task.date).toLocaleTimeString('pt-BR')}</td>
              <td>
                {/* <button className="text-yellow-400 hover:text-yellow-300">✏️</button> */}
                <button className="text-red-400 hover:text-red-300 ml-2 mt-2">
                  <Image width={16} height={16} src="/icons/check-square.svg" alt="check" />
                </button>
                <button className="text-red-400 hover:text-red-300 ml-2 mt-2">❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}