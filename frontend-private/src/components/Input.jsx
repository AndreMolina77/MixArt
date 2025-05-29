const TextInput = ({ text, value, onChange, placeholder, type = "text", disabled = false, required = false }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-sm text-[#7A6E6E] font-[Alexandria]">{text}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} required={required} className={`bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria] placeholder-[#9CA3AF] transition focus:border-[#E07A5F] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    </div>
  )
}
export default TextInput