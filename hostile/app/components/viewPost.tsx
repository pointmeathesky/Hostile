import React, { useEffect, useState } from "react";
import Window from "./windowFeed";
import Desktop from "../page";

const Post = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postId = urlParams.get('id');

    useEffect(() => {




        const fetchData = async () => {
            try {
                const response = await fetch(`/api/post/${postId}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const json = await response.json();
                setData(json.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (postId) {
            fetchData();
        } else {
            setError("Invalid Post ID");
            setLoading(false);
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            {data ? (
                <div className="">
                    <div className="flex-wrap text-center border-b border-black">
                        <h1 className="text-2xl font-bold py-1">{data.name}</h1>
                        <p className="text-md py-1">{data.body}</p>

                        <p className="text-gray-500 text-xs"><strong>Posted by: </strong>{data.belongsTo.username}
                            <strong> at:</strong> {new Date(data.createdAt).toLocaleString()}</p>

                    </div>

                    {data.comments && data.comments.length > 0 ? (
                        <ul>
                            {data.comments.map((comment) => (
                                <li key={comment.id}>
                                    <div className="py-2">
                                    <p><strong>{comment.belongsTo.username}:</strong> {comment.body}</p>
                                    <p className="text-gray-500 text-sm"><strong>Posted
                                        at:</strong> {new Date(comment.createdAt).toLocaleString()}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No Comments, make the first one</p>
                    )}

                    <form action="/api/makecomment" method="post">
                        <input type="hidden" name="postId" value={postId}/>
                        <textarea className="border min-h-32 w-full" name="comment" id="comment"
                                  placeholder="Make a Comment"></textarea>
                        <button className="w-full mt-2 px-2 bg-bargray border border-cus" type="submit">Submit Comment
                        </button>
                    </form>

                </div>

            ) : (
                <p>No data found</p>
            )}
        </div>
    );
};

const Posting = () => {
    return (
        <Desktop content={<Window content={<Post/>}/>}/>
    )
}

export default Posting;
