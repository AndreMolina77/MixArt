import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordInput = ({ text, value, onChange, placeholder, disabled = false, required = false }) => {
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col w-full relative">
      <label className="mb-1 text-sm text-[#7A6E6E] font-[Alexandria]">{text}</label>
      <div className="relative">
        <input type={show ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} required={required} className={`w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 pr-10 outline-none text-[#7A6E6E] font-[Alexandria] placeholder-[#9CA3AF] transition focus:border-[#E07A5F] [&::-webkit-credentials-auto-fill-button]:hidden [&::-webkit-password-auto-fill-button]:hidden ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}/>
        <button type="button" onClick={() => setShow(!show)} disabled={disabled} className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7A6E6E] ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#5c5252] transition'}`}> {show ? <FaEyeSlash/> : <FaEye/>}
        </button>
      </div>
    </div>
  )
}
export default PasswordInput