import { ChevronUp, ChevronDown } from 'lucide-react'

const QuantityInput = ({ value = 1, onChange, min = 1, max = 99 }) => {
  const increment = () => {
    if (value < max && onChange) {
      onChange(value + 1)
    }
  }
  const decrement = () => {
    if (value > min && onChange) {
      onChange(value - 1)
    }
  }
  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value) || min
    if (newValue >= min && newValue <= max && onChange) {
      onChange(newValue)
    }
  }
  return (
    <div className="relative w-18 border border-[#CCC] rounded text-center flex flex-col justify-center items-center text-[#7A6E6E] overflow-hidden">
      <input 
        type="number"
        value={value}
        onChange={handleInputChange}
        className="w-full py-1 pr-6 text-center border-none outline-none bg-transparent"
        min={min}
        max={max}
      />
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
 