type Heading = {
    title: string
}

export const Heading = (heading: Heading)=>{
    return (
        <div className="text-2xl m-2 mb-0 pb-0 p-2 text-center sm:text-3xl font-extrabold flex justify-center">{heading.title}</div>
    )
}