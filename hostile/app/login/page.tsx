'use client'
import Browser from "@/app/components/browser";
import Form from "@/app/components/form";
import React from "react";
import Desktop from "@/app/page";

const Interface = () => {
    return (
        <div className=" h-min w-full bg-white border-4 border-panelgray justify-center mb-4 mx-6">
            <div className={"bg-winblue border-black border-b"}>
                <h1 className={"text-2xl font-bold text-center p-2"}>Welcome to Hostile!</h1>
            </div>
            <div className={`flex flex-row  w-full basis-1/6 pt-2 justify-center  `}>
                <img className="object-contain size-1/6 " src="/logo3.png"/>

            </div>
            <form
                className=" text-black w-full text-center justify-center rounded  px-8 pt-6 pb-8 mb-4"
                action="/api/signin" method="post">
                <div className="p-4 ">
                    {/*<label className="p-4 flex justify-center items-center" htmlFor="uname">User Name:</label>*/}
                    <input className=" py-2  px-3 border border-black min-w-40" type="text" placeholder="Username"
                           autoComplete="username" required={true} name="Username" id="uname"/><br></br>
                </div>

                <div className="p-4  ">
                    {/*<label className="p-4 " htmlFor="pword">Password:</label>*/}
                    <input className="  py-2 px-3 border border-black min-w-40" type="password"
                           placeholder="Password" required={true} autoComplete="new-password" name="Password"
                           id="pword" /><br></br>

                </div>

                <button className=" p-2 rounded font-bold hover:border-2   border border-black" type="submit"> Login
                </button>

            </form>

        </div>
    )
}

const Login = () => {
    return (
        <Desktop content={<Browser content={<Interface/>}></Browser>}/>
        // <Browser content="test"></Browser>
    )
}

export default Login