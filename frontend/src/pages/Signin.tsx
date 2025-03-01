import { Fragment, useState } from "react";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { Quote } from "../components/Quote";
import { WarnHeading } from "../components/WarnHeading";
import { SubmitButton } from "../components/Button";
import { ShowErrorMessage } from "../components/ShowMessage";
import { UserType } from "../components/UserTypeSelect";
import { ShowPassword } from "../components/ShowPassword";
import { useSigninForm } from "../hooks/use-form";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [showPassword, setShowPassword] = useState(false); 
    const [userType, setUserType] = useState("Individual");
    const navigate = useNavigate();


    // Using custom hook for form and validation
    const { postInputs, emailError, passwordError, setPostInputs, handleSubmit, isSubmitting, errorMessage, setErrorMessage } = useSigninForm({
        navigate,
        userType
    });

    return (
        <Fragment>
            <div className="grid grid-cols-1 bg-slate-900/95 md:grid-cols-2 overflow-auto h-screen items-center">
                <ShowErrorMessage message={errorMessage} setErrorMessage={setErrorMessage} />
                <div className="flex h-full bg-white justify-center p-2 items-center md:p-10 w-full">
                    <div className="w-[70%] md:w-[85%]">
                        <Heading title="Login your account" />
                        <WarnHeading refTitle="Signup" reference="/signup" content="Register as a new user." />
                        <UserType userType={userType} setUserType={setUserType} />

                        <InputBox
                            heading="Email"
                            id="emailID"
                            placeholder="mail@example.com"
                            type="text"
                            value={postInputs.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const email = e.target.value;
                                setPostInputs((c) => ({
                                    ...c,
                                    email,
                                }));
                            }}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

                        <InputBox
                            heading="Password"
                            id="password"
                            placeholder="Password"
                            type={showPassword ? "text" : "password" }
                            value={postInputs.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const password = e.target.value;
                                setPostInputs((c) => ({
                                    ...c,
                                    password,
                                }));
                            }}
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

                        <ShowPassword visibilityChange={ ()=> setShowPassword(!showPassword)} />
                        <SubmitButton onClick={handleSubmit} isSubmitting={isSubmitting} title="Signin" />
                    </div>
                </div>
                <Quote
                    content="“The best way to find yourself is to lose yourself in the service of others.”"
                    author="Shivam Tiwari"
                    reputation="Node Noobs | Member"
                />
            </div>
        </Fragment>
    );
};
