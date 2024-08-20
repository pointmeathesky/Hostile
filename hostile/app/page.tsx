'use client'
import React, { useState } from "react";
import { useSession } from 'next-auth/react';
import Profile from "@/app/DesktopComponents/profile";
import PostsList from "@/app/DesktopComponents/postslist";
import SinglePost from "@/app/DesktopComponents/singlepost";
import DraggableWindow from "@/app/DesktopComponents/window";
import Login from "@/app/DesktopComponents/login";
import Post from "@/app/components/Post";
import { v4 as uuidv4 } from 'uuid';
import Window from "@/app/DesktopComponents/window2";
import Menu from "@/app/DesktopComponents/menu";
import SignUp from "@/app/DesktopComponents/signup";
import Image from 'next/image';

interface ActiveWindow {
    id: string;
    type: string;
    params?: any;
    zIndex: number;
    minimized?: boolean;
}

interface SignInProps {
    onPostSelect?: (postId: string) => Promise<void>;
}

function Desktop() {
    const { data: session, status } = useSession();
    const [colo, setColo] = useState("invert-0");
    const [changed, change] = useState(false);
    const [activeWindows, setActiveWindows] = useState<ActiveWindow[]>([]);
    const [highestZIndex, setHighestZIndex] = useState(1); // Track the highest z-index

    function invColors() {
        if (!changed) {
            setColo("invert");
            change(true);
        } else {
            setColo("invert-0");
            change(false);
        }
    }

    const handleContentChange = (type: string, params: any = {}, closeId?: string) => {
        if (closeId) {
            handleCloseWindow(closeId);
        }
        const newWindow = {
            id: uuidv4(),
            type,
            params,
            zIndex: highestZIndex + 1,
            minimized: false
        };
        setHighestZIndex(highestZIndex + 1); // Increase the highest z-index
        setActiveWindows([...activeWindows, newWindow]);
    };

    const handlePostSelect = async (postId: string) => {
        try {
            const response = await fetch(`/api/posts/${postId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const postTitle = data.data.name; // Adjust based on your actual API response structure
            handleContentChange('singlePost', { postId, title: postTitle });
        } catch (error) {
            console.error('Failed to fetch post:', error);
        }
    };

    const handleCloseWindow = (id: string, minimize = false) => {
        setActiveWindows((prevWindows) => {
            const updatedWindows = prevWindows.map((win) => {
                if (win.id === id) {
                    return { ...win, minimized: minimize };
                }
                return win;
            });
            return minimize ? updatedWindows : updatedWindows.filter(win => win.id !== id);
        });
    };

    const bringToFront = (id: string) => {
        setHighestZIndex(highestZIndex + 1); // Increase the highest z-index
        setActiveWindows((prevWindows) => {
            const updatedWindows = prevWindows.map((win) => {
                if (win.id === id) {
                    return { ...win, zIndex: highestZIndex + 1, minimized: false };
                }
                return win;
            });
            return updatedWindows;
        });
    };

    const SignIn = ({ onPostSelect }: SignInProps) => {
        return (
            <div>
                <button className="mx-2 mt-8 px-4 text-sm hover:text-white hover:bg-blue-900 hover:bg-opacity-50"
                        onClick={() => handleContentChange('signup')}>
                    <Image src="/sign.png" alt={"sign"} />
                    Sign In
                </button>
            </div>
        );
    };

    const ProfileButton = () => {
        return (
            <div>
                <button
                    className="mx-2 mt-8 px-4 text-sm hover:text-white hover:bg-blue-900 hover:bg-opacity-50"
                    onClick={() => handleContentChange('profile')}
                >
                    <Image src="/sign.png" alt={"sign"}/>
                    Profile
                </button>
            </div>
        );
    };

    const PostsButton = () => {
        return (
            <div>
                <button
                    className="mx-2 mt-8 px-4 text-sm hover:text-white hover:bg-blue-900 hover:bg-opacity-50"
                    onClick={() => handleContentChange('posts')}
                >
                    <Image className="object-contain h-14" src="/abyss.png" alt={"abyss"}/>
                    Abyss
                </button>
            </div>
        );
    };

    const PostButton = () => {
        return (
            <div>
                <button
                    className="mx-2 mt-8 px-4 text-sm hover:text-white hover:bg-blue-900 hover:bg-opacity-50"
                    onClick={() => handleContentChange('post')}
                >
                    <Image  src="/post.png" alt={"post"}/>
                    Post
                </button>
            </div>
        );
    };

    const MenuButton = () => {
        return (
            <div>
                <button
                    className="mx-1 mt-8 px-4 text-sm hover:text-white hover:bg-blue-900 hover:bg-opacity-50"
                    onClick={() => handleContentChange('menu')}
                >
                    <Image src="/disc.png" alt={"disc"} />
                    Discover
                </button>
            </div>
        );
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <div className={`${colo} bg-backblue`}>
            <div className="flex flex-row">
                <div className="flex flex-col min-h-screen">
                    {session ? <ProfileButton /> : <SignIn />}
                    {session ? <PostButton /> :<div></div> }
                    <MenuButton />
                    <PostsButton />
                </div>

                <div className="p-4">
                    {activeWindows.map((window) => (
                        !window.minimized && (
                            window.type === 'post' || window.type === 'menu' ? (
                                <Window
                                    key={window.id}
                                    title={window.params?.title || window.type}
                                    zIndex={window.zIndex} // Pass zIndex to Window
                                    onClose={() => handleCloseWindow(window.id)}
                                    onMinimize={() => handleCloseWindow(window.id, true)} // Minimize window
                                    bringToFront={() => bringToFront(window.id)} // Bring window to front on click
                                >
                                    {window.type === 'post' && <Post />}
                                    {window.type === 'menu' && <Menu />} {/* Replace with your actual Menu component */}
                                </Window>
                            ) : (
                                <DraggableWindow
                                    key={window.id}
                                    title={window.params?.title || window.type}
                                    zIndex={window.zIndex} // Pass zIndex to DraggableWindow
                                    onClose={() => handleCloseWindow(window.id)}
                                    onMinimize={() => handleCloseWindow(window.id, true)} // Minimize window
                                    bringToFront={() => bringToFront(window.id)} // Bring window to front on click
                                >
                                    {window.type === 'signin' && <Login handleContentChange={handleContentChange} onClose={() => handleCloseWindow(window.id)}/>}
                                    {window.type === 'signup' && <SignUp handleContentChange={handleContentChange} onClose={() => handleCloseWindow(window.id)} />}
                                    {window.type === 'profile' && <Profile onPostSelect={handlePostSelect} />}
                                    {window.type === 'posts' && <PostsList onPostSelect={handlePostSelect} />}
                                    {window.type === 'singlePost' && window.params?.postId && (
                                        <SinglePost
                                            postId={window.params.postId}
                                            onBack={() => handleCloseWindow(window.id)}
                                        />
                                    )}
                                </DraggableWindow>
                            )
                        )
                    ))}
                </div>
            </div>
            <nav
                className="fixed bottom-0 bg-panelgray text-black flex flex-row items-center  w-full h-7 text-lg border-t">
                <button onClick={invColors} className="mx-2 px-2 shadow-lg border border-cus border-opacity-75">
                    <div className="flex flex-row">
                        <Image src="/win.png" alt={"computer"} />
                        <span className="text-sm px-2">Start</span>
                    </div>
                </button>
                <div className="flex flex-row text-left flex-grow text-nowrap ">
                    {activeWindows.map((window) => (
                        <button
                            key={window.id}
                            onClick={() => bringToFront(window.id)}
                            className={`mx-2 px-2 text-sm min-w-28 max-w-56 flex-grow shadow-lg border border-cus bg-no-repeat bg-center bg-left bg-[url(/inet.png)] ${window.zIndex == highestZIndex ? 'border-2 border-cus bg-[#e0e0e0]' : 'bg-panelgray'  } truncate`}
                        >
                            {window.params?.title || window.type}
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
}

export default Desktop;
