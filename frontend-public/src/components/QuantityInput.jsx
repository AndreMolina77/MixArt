import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

const QuantityInput = () => {
  const [value, setValue] = useState(1)
  const increment = () => {
    if (value < 99) setValue(value + 1)
  }
  const decrement = () => {
    if (value > 1) setValue(value - 1)
  }
  return (
    <div className="relative w-18 border border-[#CCC] rounded text-center flex flex-col justify-center items-center text-[#7A6E6E] overflow-hidden">
      <span className="w-full py-1 pr-6">{String(value).padStart(2, '0')}</span>
      <div className="absolute right-0 top-0 h-full flex flex-col justify-center items-center gap-1 pr-1.5">
        <button onClick={increment} className="hover:text-[#E07A5F]">
          <ChevronUp size={14}/>
        </button>
        <button onClick={decrement} className="hover:text-[#E07A5F]">
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  )
}
export default QuantityInput