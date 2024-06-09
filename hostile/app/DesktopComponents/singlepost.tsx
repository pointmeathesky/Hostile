'use client';
import React, { useState, useEffect } from 'react';

const SinglePost = ({ postId, onBack }) => {
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${postId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPost(data.data);
                setComments(data.data.comments || []);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, content: commentContent }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error creating comment');
            }

            const newComment = await response.json();
            setComments([...comments, newComment.data]);
            setCommentContent('');
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <div>An error occurred: {error}</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="">
            <div className="flex-wrap text-center border-b-2 border-bargray ">
                <h1 className="text-2xl font-bold py-1">{post.name}</h1>
                <p className="text-md py-1 break-words ">{post.body}</p>
                <p className="text-gray-500 text-xs"><strong>Posted by: </strong>{post.belongsTo.username}
                    <strong> at:</strong> {new Date(post.createdAt).toLocaleString()}</p>
            </div>

            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment: any) => (
                        <li key={comment.id}>
                            <div className="py-4">
                                <p><strong>{comment.belongsTo.username}:</strong> {comment.body}</p>
                                <p className="text-gray-500 text-sm"><strong>Posted
                                    at:</strong> {new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center pt-4">No Comments yet, make the first one</p>
            )}
<div className={"flex justify-center max-w-2x pt-4 pb-4"}>
            <form className={"l justify-center text-center"} onSubmit={handleCommentSubmit}>
                <textarea
                    className="border mt-2 min-h-24 w-full"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Add a comment"
                    required
                />
                <button className="w-full mt-2 px-2 bg-bargray border border-cus" type="submit">
                    Submit
                </button>
            </form>
</div>
        </div>
    );
}

export default SinglePost;
