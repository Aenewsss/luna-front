import Image from "next/image";

interface IProps {
  title: string
  value: number
  color: string
  icon: 'canceled' | 'to-do' | 'done'
}

export default function TaskSummary({ title, value, color, icon }: IProps) {

  function getImagePath(icon: 'canceled' | 'to-do' | 'done') {
    switch (icon){
      case "canceled": return "/icons/cancel-square.svg"
      case "to-do": return "/icons/time-circle.svg"
      case "done": return "/icons/check-square.svg"
    }
  }

    return (
      <div className={`bg-secondary p-8 w-[245px] rounded-3xl shadow-md text-center flex flex-col gap-2`}>
        <div className="flex gap-2 items-center justify-center">
          <Image width={16} height={16} src={getImagePath(icon)} alt="+" />
          <h2 className={`text-5xl font-bold `}>{value}</h2>
        </div>
        <p className={`text-gray-400 text-${color} uppercase font-semibold text-sm`}>{title}</p>
      </div >
    );
  }