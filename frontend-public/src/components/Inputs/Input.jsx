const TextInput = ({text, name, value, onChange, ...Props}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-sm text-[#7A6E6E] font-[Alexandria]">{text}</label>
      <input type="text" className="bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"/>
    </div>
  )
}
export default TextInput