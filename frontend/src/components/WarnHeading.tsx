import { Link } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"

interface WarnHeading {
    content: string
    readonly reference: string
    readonly refTitle: string
}

export const WarnHeading = (warnHeading: WarnHeading) => {
    return (
        <Fragment>
            <div className="text-sm text-center mt-1 mb-2 sm:text-base font-light sm:font-medium text-gray-500">
                {warnHeading.content}    
                <Link className="p-2 hover:underline text-blue-600 hover:text-red-500" to={warnHeading.reference}>{warnHeading.refTitle}</Link>
            </div>
        </Fragment>
    )
}