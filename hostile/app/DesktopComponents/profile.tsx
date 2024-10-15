'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

interface Post {
    id: string;
    name: string;
    body: string;
    createdAt: string;
}

interface Comment {
    id: string;
    createdAt: string;
    body:string;
    postId: string;
}

const Profile = ({ onPostSelect, handleContentChange, onClose }) => {
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [comment, setComments] = useState<Comment[]>([]);
    useEffect(() => {
        const fetchPosts = async () => {
            if (status === 'authenticated') {
                try {
                    const response = await fetch('/api/userposts');
                    const response2 = await fetch('/api/comments');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    if (!response2.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    const data2 = await  response2.json()
                    setPosts(data.data || []);
                    setComments(data2.data || []);
                } catch (error) {
                    setError('Failed to load all content');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPosts();
    }, [status]);

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

    const handleDeleteC = async (commentId: string) => {
        try {
            const response = await fetch('/api/deleteComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commentId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }

            // Update the posts state to remove the deleted comment
            setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
        } catch (error) {
            setError('Failed to delete comment');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to log out');
            }

            await response.json();
            signOut({ callbackUrl: '/' });
        } catch (error) {
            setError('Failed to log out');
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'unauthenticated') {
        window.location.href = '/'; // Redirect to sign-in if unauthenticated
        return null;
    }

    return (
        <div>
            <button className="border-b-2 r" onClick={handleLogout}>Logout</button>

            <h1 className="text-4xl font-bold text-center ">{session?.user?.name || 'User'}</h1>
            <Tabs>
                <TabList>
                    <Tab>Posts</Tab>
                    <Tab>Comments</Tab>
                </TabList>

                <TabPanel>
                    <h2> {loading ? (
                        <p>Loading posts...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : posts.length > 0 ? (
                        <ul className="pb-4">
                            {posts.map((post) => (
                                <li className="pb-2 " key={post.id}>
                                    <div className={"cursor-pointer hover:underline"}
                                         onClick={() => onPostSelect(post.id)}>{post.name}</div>
                                    <button className={"text-xs text-gray-500 border-b"}
                                            onClick={() => handleDelete(post.id)}>Delete Post
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span>
                            No posts yet,{" "}
                            <span
                                className="cursor-pointer underline underline-offset-1"
                                onClick={() => {
                                    handleContentChange('post', {}, onClose);
                                }}
                            >
                                Create One
                            </span>
                        </span>


                    )}</h2>
                </TabPanel>
                <TabPanel>
                    <h2>{loading ? (
                        <p>Loading comments...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : comment.length > 0 ? (
                        <ul className="pb-4">
                            {comment.map((comment) => (
                                <li className="pb-2 " key={comment.postId} onClick={() => onPostSelect(comment.postId)}>
                                    <div className={"cursor-pointer hover:underline"}>{comment.body}</div>
                                    <button className={"text-xs text-gray-500 border-b"}
                                            onClick={() => handleDeleteC(comment.id)}>Delete Comment
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No comments yet.</p>
                    )}</h2>
                </TabPanel>
            </Tabs>


        </div>
    );
};

export default Profile;
