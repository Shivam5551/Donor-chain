import { Fragment, useState } from "react";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { Quote } from "../components/Quote";
import { WarnHeading } from "../components/WarnHeading";
// import { SubmitButton } from "../components/Button";
import { ShowErrorMessage } from "../components/ShowMessage";
import { UserType } from "../components/UserTypeSelect";
import { ShowPassword } from "../components/ShowPassword";
import { useSignupForm } from "../hooks/use-form";
import { useNavigate } from "react-router-dom";
import SelectState from "../components/SelectState";
// import { FancyButton } from "../components/FancyButton";
import { SubmitButton } from "../components/Button";

export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false); 
    const [userType, setUserType] = useState("Individual");
    const navigate = useNavigate();


    // Using custom hook for form and validation
    const { postInputs, emailError, passwordError, setPostInputs, handleSubmit, isSubmitting, errorMessage, setErrorMessage } = useSignupForm({
        navigate,
        userType
    });

    return (
        <Fragment>
            <div className="grid grid-cols-1 bg-slate-900/95 md:grid-cols-2 overflow-auto h-screen items-center">
                <ShowErrorMessage message={errorMessage} setErrorMessage={setErrorMessage} />
                <div className="flex h-full bg-white justify-center p-2 items-center md:p-10 w-full">
                    <div className="w-[70%] md:w-[85%]">
                        <Heading title="Create an account" />
                        <WarnHeading refTitle="Login" reference="/signin" content="Already have an account" />
                        <UserType userType={userType} setUserType={setUserType} />
                        {   userType === 'Individual' ? 
                            <InputBox 
                                heading="Full Name"
                                id="fullName"
                                placeholder="Enter Full Name"
                                type='text'
                                value={postInputs.fullName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                    const fullName = e.target.value;
                                    setPostInputs((c)=> ({
                                        ...c,
                                        fullName,
                                    }));
                                }}
                            /> :
                            <InputBox
                            heading="Charity Name"
                            id="orgName"
                            placeholder="Enter charity name"
                            type='text'
                            value={postInputs.orgName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                const orgName = e.target.value;
                                setPostInputs((c)=> ({
                                    ...c,
                                    orgName,
                                }));
                            }}
                            />
                        }
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

                        <div className="mt-1">
                        <label className="text-base text-left font-semibold sm:text-lg mt-1">Select Your State</label>
                            <SelectState
                                value={postInputs.state}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const state = e.target.value;
                                    setPostInputs((c)=> ({
                                        ...c,
                                        state,
                                    }))
                                }}
                            />
                        </div>

                        {   userType === 'Individual' ? "" :
                            <>
                                <InputBox
                                heading="Charity Sector"
                                id="charitySector"
                                placeholder="Enter charity sector"
                                type='text'
                                value={postInputs.orgSector}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                    const orgSector = e.target.value;
                                    setPostInputs((c)=> ({
                                        ...c,
                                        orgSector,
                                    }));
                                }}
                                />
                                <InputBox
                                heading="Charity Unique Id"
                                id="charityUniqueId"
                                placeholder="Enter charity unique ID"
                                type='text'
                                value={postInputs.orgUniqueID}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                    const orgUniqueID= e.target.value;
                                    setPostInputs((c)=> ({
                                        ...c,
                                        orgUniqueID,
                                    }));
                                }}
                                />
                            </>
                        }
                        

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
                        <SubmitButton onClick={handleSubmit} isSubmitting={isSubmitting} title="Signup" />
                        
                         {/* <FancyButton onClick={handleSubmit} isSubmitting={isSubmitting} title="Signup"/> */}
                    </div>
                </div>
                <Quote
                    content="“Together, we can make a difference. Every action, no matter how small, creates a ripple of change.”"
                    author="Shivam Tiwari"
                    reputation="Node Noobs | Member"
                />
            </div>
        </Fragment>
    );
};
