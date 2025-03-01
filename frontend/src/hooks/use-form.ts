import { useState, useEffect } from "react";
import { signInRequest, signupRequest } from "../utils/api";
import { validateEmail, validatePassword } from "../utils/validation";
import { NavigateFunction } from "react-router-dom";

interface SigninInput {
    email: string;
    password: string;
}

interface SignupInput {
    fullName?: string;
    email: string;
    orgName?: string;
    orgUniqueID?: string;
    orgSector?: string;
    state: string;
    password: string;
}


export const useSigninForm = ({ navigate, userType }: {navigate: NavigateFunction, userType: string}) => {
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = async () => {
        if (postInputs.email && postInputs.password && !emailError && !passwordError) {
            // navigate(`/dashboard/${userType === 'Individual' ? 'user' : 'org'}`);
            setIsSubmitting(true);
        }
    };

    useEffect(() => {
        if (isSubmitting) {
            const sendRequest = async () => {
                const { success, token, message } = await signInRequest(postInputs.email, postInputs.password, userType);
                if (success) {
                    localStorage.setItem("token", `Bearer ${token}`);
                    localStorage.setItem("userType", userType);
                    navigate("/dashboard");
                } else {
                    setErrorMessage(message || "An unknown error occurred");
                    setIsSubmitting(false);
                }
            };
            sendRequest();
        }
    }, [isSubmitting, postInputs, navigate, userType]);

    // Validate email and password
    useEffect(() => {
        setEmailError(validateEmail(postInputs.email));
        setPasswordError(validatePassword(postInputs.password));
    }, [postInputs]);

    return {
        postInputs,
        setPostInputs,
        emailError,
        passwordError,
        handleSubmit,
        isSubmitting,
        errorMessage,
        setErrorMessage,
    };
};


export const useSignupForm = ({ navigate, userType }: {navigate: NavigateFunction, userType: string}) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        orgName: "",
        orgSector: "",
        fullName: "",
        orgUniqueID: "",
        state: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = async () => {
        if (postInputs.email && postInputs.password && postInputs.state && !emailError && !passwordError) {
            if(!postInputs.fullName && userType === 'Individual') {
                setErrorMessage("Enter User Name First");
                return;
            }
            else if((!postInputs.orgName || !postInputs.orgSector || !postInputs.orgUniqueID) && userType === 'Organisation') {
                setErrorMessage('Enter all fields');
                return;
            }
            setIsSubmitting(true);
        }
    };

    useEffect(() => {
        if (isSubmitting) {
            const sendRequest = async () => {
                const { success, token, message } = await signupRequest({
                    email: postInputs.email,
                    password: postInputs.password,
                    orgName: postInputs.orgName,
                    orgSector: postInputs.orgName,
                    fullName: postInputs.fullName,
                    orgUniqueID: postInputs.orgUniqueID,
                    state: postInputs.state,
                    userType: userType
                });
                if (success) {
                    localStorage.setItem("token", `Bearer ${token}`);
                    localStorage.setItem("userType", userType);
                    console.log(userType)
                    navigate(`/dashboard/${userType === 'Organisation' ? 'org' : 'user'}`);
                
                } else {
                    setErrorMessage(message || "An unknown error occurred");
                    setIsSubmitting(false);
                }
            };
            sendRequest();
        }
    }, [isSubmitting, postInputs, navigate, userType]);

    // Validate email and password
    useEffect(() => {
        setEmailError(validateEmail(postInputs.email));
        setPasswordError(validatePassword(postInputs.password));
    }, [postInputs]);

    return {
        postInputs,
        setPostInputs,
        emailError,
        passwordError,
        handleSubmit,
        isSubmitting,
        errorMessage,
        setErrorMessage,
    };
};