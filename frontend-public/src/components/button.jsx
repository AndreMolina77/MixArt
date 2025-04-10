import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'

const Button = ({Text}) => {
    return (
        <>
        <button className="px-12 py-4 bg-red-400 rounded-sm inline-flex justify-center items-center gap-2.5">
            <span className="text-neutral-50 text-base font-medium font-['Alexandria'] leading-normal">{Text}</span>
        </button>
        </>
    )
}
export default Button