import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { NavLink } from 'react-router-dom'

const Button = ({Text, to}) => {
    return to ? (
        <NavLink 
          to={to}
          className="w-full flex items-center justify-center gap-2 bg-[#E07A5F] rounded-md py-3 px-6 text-white font-[Alexandria] hover:bg-transparent border-2 border-[#E07A5F] hover:border-[#E07A5F] hover:text-[#E07A5F] transition duration-300 cursor-pointer"
        >
          {Text}
        </NavLink>
    ) : (
        <button className="w-full h-12 bg-[#E07A5F] hover:bg-transparent border-2 border-[#E07A5F] hover:border-[#E07A5F] text-white hover:text-[#E07A5F] text-base font-semibold leading-6 rounded-md transition duration-300 shadow-sm font-[Alexandria] cursor-pointer">
            {Text}
        </button>
    )
}
export default Button