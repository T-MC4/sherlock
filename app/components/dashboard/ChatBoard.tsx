// ** React Import
import { useState } from "react"

// ** Type Import
import type { ChatType } from "~/interfaces"
import type { KeyboardEventHandler } from "react";

// ** Component Import
import ChatItem from "./ChatItem"
import ChatLoader from "./ChatLoader"
import { AiOutlineSend } from "react-icons/ai"
import TextareaAutosize from 'react-textarea-autosize'

interface Props {
  chatList: Array<ChatType>
  chatLoading: boolean
  chatStreamText: string
  handleSendMessage: any
}

export default function ChatBoard(props: Props) {

  const { chatList, chatLoading, chatStreamText, handleSendMessage } = props

  const [chat, setChat] = useState<string>('')

  const handleChatKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault()
      setChat('')
      handleSendMessage(chat)
    }
  }

  const handleSendClick = () => {
    setChat('')
    handleSendMessage(chat)
  }

  const renderChatLoading = () => {
    if (!chatLoading) return null
    if (chatStreamText === '') {
      return <ChatLoader />
    } else {
      return <ChatItem data={{
        isIn: true,
        text: chatStreamText
      }} />
    }
  }

  return (
    <div className="rounded-md w-full mx-auto bg-gray-100 p-3 sm:rounded-t-none">
      <div className="h-[520px]">
        <div className="pr-2 sm:bg-white sm:rounded-md sm:p-6 sm:shadow-md pb-2 h-full overflow-y-auto rounded-scroll" id="chat_list">
          <div className="flex flex-col justify-end">
            {chatList.map((item: ChatType, index) => <ChatItem data={item} key={index} />)}
            {renderChatLoading()}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md mt-3 p-2 flex flex-row shadow-md items-center">
        <TextareaAutosize  
          className="no-resize-textarea h-fit w-full border-none outline-none text-sm px-2" 
          value={chat}
          onChange={e => setChat(e.target.value)}
          onKeyDown={handleChatKeydown}
        />
        <button className="bg-gray-700 active:bg-gray-800 text-white rounded-md py-1 pl-4 pr-3 sm:py-2 sm:pl-6 sm:pr-5 self-end" onClick={handleSendClick}>
          <AiOutlineSend size={20} />
        </button>
      </div>
    </div>
  )
}