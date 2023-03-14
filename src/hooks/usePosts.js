import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const URL = "https://jsonplaceholder.typicode.com/posts";

const usePosts = () => {
  // Estado para guardar y modificar los Posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(URL);
        setPosts(res.data);
      } catch (err) {
        Swal.fire(
          '¡Ups!',
          'Algo salió mal',
          'error'
        )
      }
    }

    getPosts();
  }, []);

  return [posts, setPosts];
};

export { usePosts }
