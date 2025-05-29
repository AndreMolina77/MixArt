import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordInput = ({ text }) => {
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col w-full relative">
      <label className="mb-1 text-sm text-[#7A6E6E] font-[Alexandria]">{text}</label>
      <div className="relative">
        <input type={show ? 'text' : 'password'} className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 pr-10 outline-none text-[#7A6E6E] font-[Alexandria] appearance-none" style={{ 'WebkitTextSecurity': show ? 'none' : 'disc' }}/>
        <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7A6E6E]"> {show ? <FaEyeSlash /> : <FaEye />}</button>
      </div>
    </div>
  )
}
export default PasswordInput