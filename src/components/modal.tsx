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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-secondary p-6 rounded-lg shadow-lg max-w-md w-full relative text-white">
                <h1 className="text-primary text-4xl mb-4">{title}</h1>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">✕</button>
                {children}
            </div>
        </div>,
        document.body
    );
}