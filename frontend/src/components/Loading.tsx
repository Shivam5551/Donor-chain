import { HashLoader } from "react-spinners"

export const Loading = ()=> {
    return (
        <div className="w-8 h-8 animate-spin rounded-full">
                <div className="inset-5 w-full rounded-full h-full border-5 border-white border-b-red-600"/>
        </div>
    )
}

export const HashLoading = ()=> {
    return (
        <div className="flex h-screen overflow-y-auto bg-black justify-center items-center">
            <HashLoader 
                color="white"
                speedMultiplier={1.25}
                size={200}
            />
        </div>
    )
}

export const PulseLoader = ()=> {
    return (
        <div className="flex flex-col items-center justify-center h-full px-4">
                <div className="w-full border-b-white max-w-lg mt-2 sm:mt-4 p-6 rounded-md border border-gray-700 bg-gray-800">
                    <div className="flex animate-pulse space-x-4">
                        <div className="flex-1 space-y-6 py-2">
                            <div className="h-12 w-12 rounded-full bg-gray-600"></div>
                            <div className="h-4 w-3/4 bg-gray-500 rounded-lg"></div>
                            <div className="space-y-3">
                                <div className="h-3 w-5/6 bg-gray-500 rounded-md"></div>
                                <div className="h-3 w-2/3 bg-gray-500 rounded-md"></div>
                                <div className="h-3 w-full bg-gray-500 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
