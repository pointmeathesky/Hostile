'use client';
import React, { useState, useEffect } from 'react';

function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}


const PostsList = ({ onPostSelect }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            {posts.map(post => (
                <li key={post.id} onClick={() => onPostSelect(post.id)} className="group cursor-pointer pb-3 ">
                   <div className={"group-hover:underline font-bold text-xl"}> {post.name}</div>
                    <div className={"border-b"}>{truncate(post.body, 70)}</div>
                </li>
            ))}
        </ul>
    );
}

export default PostsList;
