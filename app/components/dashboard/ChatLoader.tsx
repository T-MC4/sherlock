export default function ChatLoader() {
  return (
    <div className="flex mb-3">
      <img src="/image/to_avatar.png" className="rounded-full w-8 h-8 object-cover hidden sm:block" />
      <div className="sm:ml-4 w-full text-left">
        <div className="w-fit content bg-gray-700 pl-6 pr-3 py-[13px] rounded-lg rounded-tl-none leading-6 text-right">
          <div className="loader slide flex">
            <span className="loader__dot slide__one"></span>
            <span className="loader__dot"></span>
            <span className="loader__dot"></span>
            <span className="loader__dot slide__two"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
