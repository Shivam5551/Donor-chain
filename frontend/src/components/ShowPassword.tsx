



export const ShowPassword = ({visibilityChange}: {visibilityChange: () => void})=> {
    return (
        <div className="flex items-center space-x-2 m-2">
                        <input 
                            id="show-password" 
                            type="checkbox" 
                            onChange={visibilityChange} 
                            className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500" 
                            aria-labelledby="show-password-label"
                        />
                        <label 
                            id="show-password-label" 
                            htmlFor="show-password" 
                            className="text-sm text-gray-500 cursor-pointer"
                        >
                            Show password
                        </label>
                    </div>
    )
}