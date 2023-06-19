import type { FC } from "react"
import { BsXLg } from "react-icons/bs";
import ReactModal from 'react-modal';

interface Props {
  title: string;
  open: boolean;
  onClose: any;
  footer?: any;
}

const Modal: FC<Props> = (data) => {
  const { title, open, onClose, footer, children } = data
  return (
    <ReactModal
      isOpen={open}
      shouldCloseOnOverlayClick
      onRequestClose={onClose}
      ariaHideApp={false}
      className="w-[90%] max-w-[450px] bg-white outline-none rounded-md mx-auto my-[100px] text-gray-600"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto"
    >
      <div className="px-4 py-3 border-b flex">
        <h2 className="font-bold">{title}</h2>
        <button onClick={onClose} className="ml-auto">
          <BsXLg size={14} />
        </button>
      </div>
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="border-t p-4">
          {footer}
        </div>
      )}
    </ReactModal>
  )
}

export default Modal