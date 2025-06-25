import '@fortawesome/fontawesome-free/css/all.min.css'
import { NavLink } from 'react-router-dom'

const Button = ({Text, to, onClick, customClass}) => {
  const defaultClass = "bg-[#E07A5F] border-[#E07A5F] hover:text-[#E07A5F]";
  const buttonClass = customClass || defaultClass;
  return to ? (
      <NavLink to={to} className={w-full flex items-center justify-center gap-2 ${buttonClass} rounded-md py-3 px-6 text-white font-[Alexandria] hover:bg-transparent border-2 transition duration-300 cursor-pointer}>
        {Text}
      </NavLink>
  ) : (
      <button onClick={onClick} className={w-full h-12 ${buttonClass} hover:bg-transparent border-2 text-white text-base font-semibold leading-6 rounded-md transition duration-300 shadow-sm font-[Alexandria] cursor-pointer}>
          {Text}
      </button>
  )
}
export default Button
