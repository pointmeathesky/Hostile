'use client'
import React, {useEffect, useState} from "react";
import Feed from "@/app/posts/page";
import Desktop from "@/app/page"
import Window from "@/app/components/window";
import { useRouter } from 'next/navigation';

const Post = ({ params }: { params: { slug: string } }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [comment, setComment] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/posts/${params.slug}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const json = await response.json();
                setData(json.data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchData();
        } else {
            setError("Invalid Post ID");
            setLoading(false);
        }
    }, [params.slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: params.slug, content: comment }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error creating comment');
            }

            const newComment = await response.json();
            setData((prevData: any) => ({
                ...prevData,
                comments: [...prevData.comments, newComment.data]
            }));
            setComment("");
        } catch (error: any) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {data ? (
                <div className="">
                    <div className="flex-wrap text-center border-b-2 border-bargray">
                        <h1 className="text-2xl font-bold py-1">{data.name}</h1>
                        <p className="text-md py-1">{data.body}</p>
                        <p className="text-gray-500 text-xs"><strong>Posted by: </strong>{data.belongsTo.username} <strong>at:</strong> {new Date(data.createdAt).toLocaleString()}</p>
                    </div>

                    {data.comments && data.comments.length > 0 ? (
                        <ul>
                            {data.comments.map((comment: any) => (
                                <li key={comment.id}>
                                    <div className="py-4">
                                        <p><strong>{comment.belongsTo.username}:</strong> {comment.body}</p>
                                        <p className="text-gray-500 text-sm"><strong>Posted at:</strong> {new Date(comment.createdAt).toLocaleString()}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No Comments, make the first one</p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="border min-h-24 w-full"
                            name="comment"
                            id="comment"
                            placeholder="Make a Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button className="w-full mt-2 px-2 bg-bargray border border-cus" type="submit">
                            Submit Comment
                        </button>
                    </form>
                </div>
            ) : (
                <p>Invalid Post ID</p>
            )}
        </div>
    );
};

const Posting = ({ params }: { params: { slug: string } }) => {
    return (
        <Window content={<Post{...{params}}/>}/>
    )
}

export default Posting;

