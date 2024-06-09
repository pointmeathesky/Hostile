import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const Post = () => {
    const [name, setName] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('/api/makepost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, body }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error creating post');
            }

            const data = await response.json();
            setSuccess('Post created successfully!');
            setName("");
            setBody("");

            // Navigate to /posts after successful post creation
            router.push('/posts');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <form className="flex flex-col pt-6 min-w-full justify-items-center content-center self-center bg-panelgray" onSubmit={handleSubmit}>
            <input
                className="mx-4 p-2 xs:min-w-80 sm:min-w-96 text-l border border-black"
                type="text"
                placeholder="Title"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <textarea
                className="mx-4 min-h-48 mt-2 p-2 text-m border border-black min-w-40"
                placeholder="Body"
                name="body"
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <br />
            <button className="w-full mt-2 px-2 bg-bargray border border-cus" type="submit">
                Create Post
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </form>
    );
};

export default Post;
