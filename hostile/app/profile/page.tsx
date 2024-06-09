'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Desktop from "@/app/page";
import Browser from "@/app/components/browser";

interface Post {
    id: string;
    name: string;
    body: string;
    createdAt: string;
}

const Profile = () => {
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            if (status === 'authenticated') {
                try {
                    const response = await fetch('/api/userposts');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setPosts(data.data || []);
                } catch (error) {
                    setError('Failed to load posts');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPosts();
    }, [status]);

    useEffect(() => {}, [session]);

    const handleDelete = async (postId: string) => {
        try {
            const response = await fetch('/api/deletpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            // Update the posts state to remove the deleted post
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (error) {
            setError('Failed to delete post');
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'unauthenticated') {
        window.location.href = '/signin'; // Redirect to sign-in if unauthenticated
        return null;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">{session?.user?.name || 'User'}'s Profile</h1>
            <h2 className="pt-4">Your Posts</h2>
            {loading ? (
                <p>Loading posts...</p>
            ) : error ? (
                <p>{error}</p>
            ) : posts.length > 0 ? (
                <ul className="pb-4">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <a href={`/posts/${post.id}`}>
                                {post.name} <br />
                            </a>
                            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts yet.</p>
            )}
        </div>
    );
};

const Page = () => {
    return (
        <Desktop content={<Browser content={<Profile />} />} />
    );
};

export default Page;
