import { useContext } from "react"
import { ThemeContext } from "../context/context"

export const CustomSlider = ({title, id, min, max, step, value, onChange, ref}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="p-2 flex flex-row justify-between items-center">
      <input
        type      = "range"
        className = {`transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent ${theme == 'dark'? 'bg-emerald-400 accent-emerald-800' : 'bg-emerald-400 accent-emerald-600'}`}
        min       = {min} 
        max       = {max}
        step      = {step}
        id        = {id}
        value     = {value} 
        onChange  = {onChange}
        ref       = {ref}
      />
      <div className="ml-3 pl-3 relative h-5 w-10"> 
        <label className={`mx-2 absolute start-0 ${theme == 'dark'? 'text-zinc-100' : 'text-emerald-950'} font-bold`}>
            {value}
        </label>
      </div>
    </div>
  )
}