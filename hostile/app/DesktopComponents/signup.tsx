import React, { useState } from "react";
import validator from 'validator';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const SignUp = ({ handleContentChange, onClose }) => {
    const [badPass, setBadPass] = useState('');
    const [matchPass, setMatchPass] = useState("");
    const [password, setPassword] = useState("");

    const check = (value) => {
        if (password !== value) {
            setMatchPass("Passwords must match");
        } else {
            setMatchPass("");
        }
    };

    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 0,
            minUppercase: 0, minNumbers: 0, minSymbols: 0
        })) {
            setBadPass("");
            setPassword(value);
        } else {
            setBadPass("Password must be at least 8 characters");
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get the form data
        const formData = new FormData(event.target);
        const username = formData.get('Username');
        const password = formData.get('Password');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response?.ok) {
                const loginResult = await signIn('credentials', {
                    redirect: false, // prevent automatic redirection
                    username,
                    password,
                });

                if (loginResult?.ok) {
                    // Navigate to the profile or perform other actions on successful login
                    handleContentChange('profile', {}, onClose);
                    onClose();
                } else {
                    console.error('Login failed after registration:', loginResult?.error);
                }
            } else {
                // Handle error (e.g., user creation failed)
                const result = await response.json();
                console.error('Error:', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className=" h-min w-full bg-white border-4 border-panelgray justify-center mb-4 ">
            <div className={"bg-winblue border-black border-b"}>
                <h1 className={"text-2xl font-bold text-center p-2"}>Welcome to Hostile!</h1>
            </div>
            <div className={`flex flex-row  w-full basis-1/6 pt-2 justify-center  `}>
                <Image className="object-contain size-1/6 " src="/logo3.png" width={30} height={30} alt={"logo"} />
            </div>
            <form
                className=" text-black w-full text-center justify-center rounded  px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
            >
                <div className="p-4 ">
                    <input className=" py-2  px-3 border border-black min-w-40" type="text" placeholder="Username"
                           autoComplete="username" required={true} name="Username" id="uname" /><br></br>
                </div>

                <div className="p-4  ">
                    <input className="  py-2 px-3 border border-black min-w-40" type="password"
                           placeholder="Password" required={true} autoComplete="new-password" name="Password"
                           id="pword" onChange={(e) => validate(e.target.value)} /><br></br>
                    {badPass === '' ? null :
                        <span className="text-red-600">{badPass}</span>
                    }
                </div>
                <div className="p-4 ">
                    <input className=" py-2  px-3 border border-black min-w-40" type="password"
                           placeholder="Verify Password" required={true} autoComplete="new-password" name="Password"
                           id="pword2" onChange={(e) => check(e.target.value,)} /> <br></br>
                    {matchPass === '' ? null :
                        <span className="text-red-600 ">{matchPass}</span>
                    }
                </div>
                <button className=" p-2 rounded font-bold  hover:bg-winblue hover:text-white border border-black" type="submit"> Sign Up
                </button>
            </form>
            <p className="text-center cursor-pointer" onClick={() => {
                handleContentChange('signin', {}, onClose);
                onClose();
            }}>Already have an Account?</p>
        </div>
    )
}

export default SignUp;
