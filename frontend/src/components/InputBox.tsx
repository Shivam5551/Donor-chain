interface InputType {
    heading: string,
    id: string,
    placeholder: string,
    type: string,
    value?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,

}

export const InputBox = (inputType: InputType)=> {
    return (
        <div className="text-base w-full sm:text-lg font-light sm:font-medium">
            <div className="text-base text-left font-semibold sm:text-lg mt-1">{inputType.heading}</div>
            <input 
                className="my-0.5 w-full text-base px-3 py-2 rounded-md border border-gray-400 "
                id={inputType.id} 
                required={true}
                placeholder={inputType.placeholder} 
                type={inputType.type} 
                value={inputType.value} 
                onChange={inputType.onChange}
                autoComplete="off"
            />
        </div>
    )
}

