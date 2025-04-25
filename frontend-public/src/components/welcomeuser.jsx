import React from 'react'

const WelcomeUser = ({ Name }) => {
  return (
    <div className="text-1rem font-semibold">
      <span className="text-[#7A6E6E]">Bienvenido!</span>
      <span className="text-[#E07A5F]"> {Name}</span>
    </div>
  )
}
export default WelcomeUser