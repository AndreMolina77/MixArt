import React from 'react'

const TransparentButton = ({Text}) => {
    return (
        <button className="w-full h-12 flex items-center justify-center gap-2 border-2 border-[#7A6E6E] rounded-md py-2 text-[#7A6E6E] font-[Alexandria] hover:bg-[#fbeeea] transition duration-300 cursor-pointer">
            {Text}
        </button>
    )
}
export default TransparentButton