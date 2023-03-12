import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  React.useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {setPosts(response.data);}
    );
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>ID Post</th>
            <th>Title</th>
            <th>Body</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.userId}</td>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <Link to={`/posts/${post.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export {Home};
