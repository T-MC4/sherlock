import { FC } from "react"
import { ChatType } from "~/interfaces"

interface Props {
  data: ChatType
}
const ChatItem: FC<Props> = ({data}) => {
  return data.isIn ? (
    <div className="sm:flex mb-3">
      <img src="/image/to_avatar.png" className="rounded-full w-8 h-8 object-cover hidden sm:block" />
      <div className="sm:ml-4 w-full text-left">
        <div className="w-fit content bg-gray-700 px-4 py-2 rounded-lg rounded-tl-none leading-5 sm:leading-6 max-w-[100%] sm:max-w-[70%] lg:max-w-[60%] mr-auto text-white text-left text-sm">
          {data.text.split("\n").map((i,key) => {
            return <div key={key} className="w-full break-word">{i}</div>
          })}
        </div>
        <div className="text-xs sm:text-sm text-gray-400 mt-1 hidden sm:block">
          {data.time}
        </div>
      </div>
    </div>
  ) : (
    <div className="sm:flex sm:flex-row-reverse mb-3">
      <img src="/image/from_avatar.png" className="rounded-full w-8 h-8 object-cover hidden sm:block" />
      <div className="sm:mr-4 w-full">
        <div className="w-fit content bg-gray-300 px-4 py-2 rounded-lg rounded-tr-none leading-5 sm:leading-6 max-w-[100%] sm:max-w-[70%] lg:max-w-[60%] ml-auto text-right text-sm">
          {data.text.split("\n").map((i,key) => {
            return <div key={key} className="w-full break-word">{i}</div>
          })}
        </div>
        <div className="text-xs sm:text-sm text-left sm:text-right text-gray-400 mt-1 hidden sm:block">
          {data.time}
        </div>
      </div>
    </div>
  )
}

export default ChatItem