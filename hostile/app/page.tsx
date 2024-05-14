

'use client'
import React, { useState, useEffect } from "react";
// import Cookies from 'js-cookie';
import PostModal from "./components/postModal";
import Post from "./components/Post";



function Desktop({content}:{content?:any}) {
    const [showModal, setShowModal] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [colo, setColo] = useState("invert-0");
    const [changed, change] = useState(false);
    // useEffect(() => {
    //     const uname = Cookies.get('user');
    //     setIsSignedIn(!!uname);
    //
    //     // if (!!uname) {
    //     //   setColo("invert");
    //     //   change(true);
    //     // } else {
    //     //   setColo("invert-0");
    //     //   change(false);
    //     // }
    // }, []);



    const openModal = () => {
        setShowModal(true);
    };


    function invColors() {
        if (!changed){
            setColo("invert");

            change(true);
        }
        else {
            setColo("invert-0");
            change(false);
        }

    }

    const SignIn = () => {
        return(
            <div><button className=" mx-2 mt-8 px-4 text-sm   hover:text-white  hover:bg-blue-900 hover:bg-opacity-50" >
                <a href="/signup">
                    <img src="/sign.png" />
                    Sign In
                </a>
            </button></div>
        )
    }

    const Profile = () => {
        return(
            <div><button className=" mx-2 mt-8 px-4 text-sm   hover:text-white  hover:bg-blue-900 hover:bg-opacity-50" >
                <a href="/api/profile">
                    <img src="/sign.png"/>
                    Profile
                </a>
            </button>
            </div>
        )
    }

    const Abyss = () => {
        return (
            <div><button className="mx-2 mt-8 px-4 text-sm hover:text-white hover:bg-blue-900 hover:bg-opacity-50">
                <a href="/feed">
                    <img className="object-contain h-14" src="/abyss.png"/>
                    Abyss
                </a>
            </button></div>
        )
    }
    return (

        <div className={`  ${colo} bg-backblue`}>
            {/* render a row of buttons using the map function */}
            <div className="flex flex-row w-min h-full ">
                <div className="flex flex-col grow h-full  min-h-screen ">
                    {isSignedIn ?  <Profile/> :  <SignIn/>}


                    <div><button className="mx-2 mt-8 px-4 text-sm hover:text-white  hover:bg-blue-900 hover:bg-opacity-50" onClick={openModal}>
                        <a >
                            <img  src="/post.png"/>
                            Post
                        </a>
                    </button></div>

                    <div><button className="mx-1 mt-8 px-4 text-sm hover:text-white hover:bg-blue-900 hover:bg-opacity-50">
                        <a href="/menu">
                            <img  src="/disc.png"/>
                            Discover
                        </a>
                    </button></div>

                    {isSignedIn ?  <Abyss/> : null }
                </div>

                <PostModal showModal={showModal} setShowModal={setShowModal}>

                    <Post/>
                </PostModal>
                <div className={"min-h-full min-w-full"}>
                {content}
                </div>
            </div>
            <nav className={`fixed bottom-0 bg-panelgray text-black flex flex-row items-center justify-between w-full h-7 text-lg border-t `}>
                {/* <a href="bluescreen"> */}
                <button onClick={invColors}
                        className="mx-2 px-2 shadow-lg border-t-2 border-l-2 border-opacity-75" >
                    <div className="flex flex-row">
                        <img src="/win.png"/>
                        <span className="text-sm px-2">Start</span>
                    </div>
                </button>
                {/* </a> */}

            </nav>
        </div>

    );
}

export default Desktop;