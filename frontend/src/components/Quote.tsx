import LOGO from '../assets/LOGO.webp'


interface Quote {
    content: string
    author: string
    reputation: string
}


export const Quote = (quote: Quote)=> {
    return (
        <div className="md:flex text-left  text-white h-screen hidden p-20 items-center justify-start">
            <div className="h-fit w-fit">
                <div className='h-full flex justify-center items-center mb-4'><img src={LOGO} className='h-50 rounded-4xl w-50'/></div>
                <div className="font-bold text-xl">
                    {quote.content}
                </div>
                <div className="font-extrabold text-3xl">
                    {/* {quote.author} */}
                </div>
                <div className="font-semibold text-balance">
                    {/* {quote.reputation}  */}
                </div>
            </div>
        </div>
    )
}