
export const CustomSlider = ({title, id, min, max, step, value, onChange, ref}) => {
  return (
    <div className="p-2 flex flex-row justify-between items-center">
      <input
        type      = "range"
        className = "transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
        min       = {min} 
        max       = {max}
        step      = {step}
        id        = {id}
        value     = {value} 
        onChange  = {onChange}
        ref       = {ref}
      />
      <div className="ml-3 pl-3 relative h-5 w-10">
        <label className="mx-2 absolute start-0">
            {value}
        </label>
      </div>
    </div>
  )
}