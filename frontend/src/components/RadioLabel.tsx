export const RadioLabel = ({ value, userType, setUserType }: {
    value: string;
    userType: string;
    setUserType: React.Dispatch<React.SetStateAction<string>>;
})=> {
    return (
        <div>
            <label className='px-2 flex hover:cursor-pointer' htmlFor={value}>
            <input 
                className="hover:cursor-pointer"
                type="radio" 
                value={value} 
                name="userType" 
                id={value} 
                checked={userType === value} 
                onChange={() => setUserType(value)} 
            />
            <span className="p-1">{value}   </span>
            </label>
        </div>
    )
}