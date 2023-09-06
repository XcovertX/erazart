export const Toggle = ({title, onChange, currentState, color }) => {
    return(  
        <div className="flex flex-row items-center justify-right mt-1">
            {/* <span className="mr-10 text-sm font-medium text-gray-900 dark:text-gray-300">
              {currentState ? 'ON' : 'OFF'}
            </span> */}
            
            <label className="relative flex items-center cursor-pointer">
              <input type="checkbox" 
                    className="sr-only peer " 
                    checked={currentState} 
                    onChange={onChange}/>
              <div className={`w-7 h-4 bg-gray-400 rounded-full peer ring-2
                                ring-gray-300 dark:peer-focus:ring-gray-800 dark:bg-gray-700 
                                peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-0.5 after:left-[1px] after:bg-gray-700 
                                after:border-gray-700 after:border-gray-900 after:rounded-full after:h-3 after:w-3 
                                after:transition-all dark:border-gray-600 peer-checked:bg-gray-900`}>
                    
              </div>
            </label>

        </div>
    )
}