'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function SignUp({ handleContentChange, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null); // Reset error state
        const result = await signIn('credentials', {
            redirect: false,
            username,
            password,
        });

        if (result?.ok) {
            //router.push('/');
            //close the current component, open the profile component
            handleContentChange('profile', {}, onClose);
            onClose();
        } else {
            // Handle sign-in error
            console.error('Sign-in failed', result?.error);
            setError('Incorrect Username or Password');
        }
    };

    return (
        <div className="h-min w-full bg-white border-4 border-panelgray justify-center mb-4 ">
            <div className={"bg-winblue border-black border-b"}>
                <h1 className={"text-2xl font-bold text-center p-2"}>Welcome to Hostile!</h1>
            </div>
            <div className={`flex flex-row w-full basis-1/6 pt-2 justify-center`}>
                <Image className="object-contain size-1/6" src="/logo3.png" alt={"logo"}/>
            </div>
            {error && <p className={"text-red-600 text-center pt-6"} >{error}</p>}
            <form
                className="text-black w-full text-center justify-center pt-4 rounded px-8  pb-8 mb-4"
                onSubmit={handleSubmit}>
                <div className="p-4">
                    <input
                        className="py-2 px-3 border border-black min-w-40"
                        type="text"
                        placeholder="username"
                        autoComplete="username"
                        value={username}
                        required
                        name="username"
                        id="uname"
                        onChange={(e) => setUsername(e.target.value)}
                    /><br></br>
                </div>

                <div className="p-4">
                    <input
                        className="py-2 px-3 border border-black min-w-40"
                        type="password"
                        placeholder="Password"
                        required
                        autoComplete="new-password"
                        value={password}
                        name="password"
                        id="pword"
                        onChange={(e) => setPassword(e.target.value)}
                    /><br></br>
                </div>

                <button className="p-2 rounded font-bold hover:bg-winblue hover:text-white border border-black" type="submit">
                    Sign In
                </button>
            </form>

        </div>
    );
}



export default SignUp;
