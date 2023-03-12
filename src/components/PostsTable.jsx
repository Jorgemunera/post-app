import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostsTable = () => {

    const URL = "http://localhost:3004/posts";

    const getData = async () => {
        try {
            const res = axios.get(URL);
            return res;
        } catch (err) {
            console.error('hubo un error')
        }
    }

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getData().then((res) => {
            setPosts(res.data);
        });
    }, [])

    return (
        <div>
            {posts.map((post) => a)}
        </div>
    );
}

export {PostsTable}