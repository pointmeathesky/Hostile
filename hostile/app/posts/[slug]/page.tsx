'use client'
import React, {useEffect, useState} from "react";
import Feed from "@/app/posts/page";
import Desktop from "@/app/page"
import Window from "@/app/components/window";

function Posts({ params }: { params: { slug: string } }) {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Start with true to show loading initially
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/posts/${params.slug}`)
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
                <a href={`/posts/${post.id}`}>


                    <h2 className='text-2xl'>{post.name} </h2>  <br/>
                    <h2 className='text-sm'> by {post.belongsTo.username}</h2>

                </a>
            ))}
        </ul>
    );
}


const Post =  ({ params }: { params: { slug: string } })=>  {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



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
            } catch (error) {
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
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            {data ? (
                <div className="">
                    <div className="flex-wrap text-center border-b-2  border-bargray">
                        <h1 className="text-2xl font-bold py-1">{data.name}</h1>
                        <p className="text-md py-1">{data.body}</p>

                        <p className="text-gray-500 text-xs"><strong>Posted by: </strong>{data.belongsTo.username}
                            <strong> at:</strong> {new Date(data.createdAt).toLocaleString()}</p>

                    </div>

                    {data.comments && data.comments.length > 0 ? (
                        <ul>
                            {data.comments.map((comment) => (
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
                        <p className="text-gray-500">No Comments, make the first one</p>
                    )}

                    <form action="/api/makecomment" method="post">
                        <input type="hidden" name="postId" value={params.slug}/>
                        <textarea className="border min-h-24 w-full" name="comment" id="comment"
                                  placeholder="Make a Comment"></textarea>
                        <button className="w-full mt-2 px-2 bg-bargray border border-cus" type="submit">Submit Comment
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
        <Desktop content={<Window content={<Post{...{params}}/>}/>}/>
    )
}

export default Posting;

