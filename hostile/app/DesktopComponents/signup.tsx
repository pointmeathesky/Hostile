import React, { useState } from "react";
import validator from 'validator';

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

    return (
        <div className=" h-min w-full bg-white border-4 border-panelgray justify-center mb-4 ">
            <div className={"bg-winblue border-black border-b"}>
                <h1 className={"text-2xl font-bold text-center p-2"}>Welcome to Hostile!</h1>
            </div>
            <div className={`flex flex-row  w-full basis-1/6 pt-2 justify-center  `}>
                <img className="object-contain size-1/6 " src="/logo3.png" />
            </div>
            <form
                className=" text-black w-full text-center justify-center rounded  px-8 pt-6 pb-8 mb-4"
                action="/user" method="post">
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
