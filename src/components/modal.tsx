import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface IProps {
    title: string
    onClose: () => void
    children?: ReactNode
    isOpen: boolean
}

export default function Modal({ title, children, onClose, isOpen }: IProps) {

    if (!isOpen) return null

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute top-0 left-0 blur-md h-screen w-screen bg-black bg-opacity-60 backdrop-blur"></div>
            <div className="rounded-lg shadow-lg max-w-lg w-full relative text-white flex flex-col gap-8">
                <h1 className="text-primary text-3xl mb-4 font-semibold">{title}</h1>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 bg-primary rounded-full px-1 text-sm">✕</button>
                {children}
            </div>
        </div>,
        document.body
    );
}