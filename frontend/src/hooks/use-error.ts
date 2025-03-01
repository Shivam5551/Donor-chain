import { useState } from "react";

export const useError = () => {
    const [errorMessage, setErrorMessage] = useState("");

    return { errorMessage, setErrorMessage };
};
