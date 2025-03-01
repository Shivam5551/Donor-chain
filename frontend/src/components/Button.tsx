import { Loading } from "./Loading"

interface Button {
    title: string
    isSubmitting: boolean
    onClick: () => void
}

export const SubmitButton = (button: Button) => {
    return(
        <button disabled={button.isSubmitting} className={`${button.isSubmitting ? "cursor-not-allowed bg-gray-600" : "cursor-pointer bg-black hover:bg-blue-500 "} text-white hover:rounded-full w-full my-2 p-2 inline-flex justify-center items-center text-center rounded-xl`} onClick={button.onClick} >
                {button.isSubmitting ? <Loading/> : button.title}
        </button>
    )
}