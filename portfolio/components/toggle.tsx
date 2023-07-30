export const Toggle = ({title, onChange, currentState}) => {
    return(  
        <div className="flex flex-row items-center justify-right mt-1">
            
            <label className="relative flex items-center cursor-pointer">
              <input type="checkbox" 
                    className="sr-only peer" 
                    checked={currentState} 
                    onChange={onChange}/>
              <div className="w-7 h-4 bg-gray-200 rounded-full peer peer-focus:ring-4 
                                peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 
                                peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-0.5 after:left-[1px] after:bg-white 
                                after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 
                                after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    
              </div>
            </label>
            <span className="mx-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {currentState ? 'ON' : 'OFF'}
            </span>
        </div>
    )
}