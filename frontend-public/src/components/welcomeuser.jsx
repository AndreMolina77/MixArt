import React from 'react'

const WelcomeUser = ({Name}) => {
  return (
    <div className="absolute top-45 right-60 font-[Alexandria] text-[1rem]">
      <span className="text-[#7A6E6E]">Bienvenido!</span>
      <span className="text-[#E07A5F] font-semibold"> {Name}</span>
    </div>
  )
}
export default WelcomeUser