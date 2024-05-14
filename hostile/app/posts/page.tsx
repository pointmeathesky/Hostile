'use client'
import React, { useEffect, useState } from 'react';
import Browser from "@/app/components/browser";
import Desktop from "@/app/page";
import Window from "@/app/components/window";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Start with true to show loading initially
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch posts:', err);
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (error) return <div>An error occurred: {error}</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <ul>
            {posts.map((post,) => (
                <div className={`flex-wrap   hover:bg-bargray border-bargray border-2 text-center text-black font-bold w-full p-4 m-2 mb-2`}>
                <a href={`/posts/${post.id}`}>


                    <h2 className='text-2xl'>{post.name} </h2>  <br/>
                    <h2 className='text-sm'> by {post.belongsTo.username}</h2>

                </a>
                </div>
            ))}
        </ul>
    );
}

function Feed() {
    return (
        <Desktop content={<Window content={<Posts/>}/>}/>
    )
}

export default Feed;
