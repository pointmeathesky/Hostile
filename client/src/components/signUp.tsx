//import { Button } from "./components/Button"
interface FormProps {
    message: string;
    urlTo: string
}
import Browser from "./browser";
import React, { useState } from "react";
import validator from 'validator'
const Form = () => {
//const message = props
//change button class to custom

    const [badPass, setBadPass] = useState('');
    const [matchPass, setMatchPass] = useState("");
    const [password, setPassword] = useState("");

     const check = (value) => {
         if (password!=value) {
             setMatchPass("Passwords must match");
         }
         else{
             setMatchPass("");
         }
     }
    const validate = (value) => {
        if(validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 0,
            minUppercase: 0, minNumbers: 0, minSymbols: 0
        })) {
            setBadPass("");
            setPassword(value);
        } else {
            setBadPass("Password must be at least 8 characters");
        }
    }

    return (
        <div className=" h-min ">
            <form className=" text-black w-full rounded bg-panelgray border border-cus px-8 pt-6 pb-8 mb-4" action="/user" method="post">
                <div className="mb-4">
                    <label className="block " htmlFor="uname">User Name:</label>
                    <input className=" py-2  px-3 border border-cus min-w-40" type="text" placeholder="Username"
                           autoComplete="username" required={true} name="Username" id="uname"/><br></br>
                </div>

                <div className="mb-4">
                    <label className="block " htmlFor="pword">Password:</label>
                    <input className="  py-2 px-3 border border-cus min-w-40" type="password"
                           placeholder="Password" required={true} autoComplete="new-password" name="Password"
                           id="pword" onChange={(e) =>validate(e.target.value)}/> <br></br>
                    {badPass === '' ? null :
                        <span className="text-red-600">{badPass}</span>
                    }
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor="pword2">Verify Password:</label>
                    <input className=" py-2  px-3 border border-cus min-w-40" type="password"
                           placeholder="Password" required={true} autoComplete="new-password" name="Password"
                           id="pword2" onChange={(e) =>check(e.target.value, )} /> <br></br>
                    {matchPass === '' ? null :
                        <span className="text-red-600">{matchPass}</span>
                    }

                </div>
                <button className="mt-2 py-2 rounded w-full bg-panelgray border border-cus" type="submit"> Sign Up
                </button>

            </form>
        </div>

    )
}

const SignUp = () => {
    return (
        <Browser content={<Form/>}></Browser>
    )
}

export default SignUp