import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

function PostDetails(props) {
    const location = useLocation();

    const params = useParams();
    const id = Number(params.id);
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}

export { PostDetails };
