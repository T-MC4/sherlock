// ** React Import
import { useState } from "react"

// ** Component Import
import Modal from "../Modal"
import { 
    BsTrash3, 
    BsXSquare,
    BsCheckSquare, 
    BsPencilSquare
} from "react-icons/bs";

// ** Type Import
import type { FC} from "react";
import type { SessionListType } from "~/interfaces"

// ** API Imports
import { deleteSession, updateSessionName } from "~/utils/api";

interface Props {
    open: boolean;
    onClose: any;
    userId: string;
    sessionList: SessionListType;
    setSessionList: any;
    currentSession: any;
    updateCurrentSession: any;
}

const SessionListModal: FC<Props> = (props) => {
    const { open, onClose, userId, sessionList, setSessionList, currentSession, updateCurrentSession } = props
    const [ editItem, setEditItem ] = useState<any>(null)
    const [ sessionName, setSessionName ] = useState<any>(null)

    const handleEdit = (item: any) => (e: any) => {
        e.stopPropagation()
        setSessionName(item.sessionName)
        setEditItem(item.sessionId)
    }

    const handleUpdate = async (e: any) => {
        e.stopPropagation()
        const success = await updateSessionName(userId, editItem, sessionName)
        if (!success) return;
        const index = sessionList.findIndex(item => item.sessionId === editItem)
        sessionList[index].sessionName = sessionName
        setSessionList(sessionList)
        setEditItem(null)
    }

    const handleDelete = (id: string) => async (e: any) => {
        e.stopPropagation()
        const success = await deleteSession(userId, id)
        if (!success) return;
        const newList = sessionList.filter(item => item.sessionId !== id)
        setSessionList(newList)
        if (newList.find(item => item.sessionId === currentSession.sessionId)) {
            return;
        } else if (newList.length === 0) {
            updateCurrentSession(null)
        } else {
            updateCurrentSession(newList[newList.length - 1])
        }
    }

    const handleView = (item: any) => (e: any) => {
        e.stopPropagation()
        updateCurrentSession(item)
        onClose()
    }
    
    return (
        <Modal
            title="Session List"
            open={open}
            onClose={onClose}
        >
            {sessionList.length === 0 ? (
                <div className="flex justify-center py-16">
                    <h1>There is no sessions</h1>
                </div>
            ) : sessionList.map((item, index) => (
                <div key={index} className="border p-2 border-gray-700 my-2 rounded cursor-pointer">
                    {item.sessionId === editItem ? (
                        <div className="flex items-center">
                            <div className="mr-auto">
                                <input
                                    type="text" 
                                    className="rounded border text-sm outline-none px-2 py-1 w-full transition"
                                    value={sessionName}
                                    onChange={(e) => setSessionName(e.target.value)}
                                    placeholder="Enter your session name"
                                />
                            </div>
                            <div className="mr-1 p-2" onClick={handleUpdate}>
                                <BsCheckSquare />
                            </div>
                            <div className="p-2" onClick={() => setEditItem(null)}>
                                <BsXSquare />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center" onClick={handleView(item)}>
                            <div className={`mr-auto px-2 py-1 text-sm border border-white ${currentSession?.sessionId === item?.sessionId ? 'text-blue-700' : ''}`}>
                                {item.sessionName}
                            </div>
                            <div className="mr-1 p-2" onClick={handleEdit(item)}>
                                <BsPencilSquare />
                            </div>
                            <div className="p-2" onClick={handleDelete(item.sessionId)}>
                                <BsTrash3 />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </Modal>
    )
}

export default SessionListModal