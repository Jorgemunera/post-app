import React from "react";
import { Container } from 'react-bootstrap';
import {PostsTable} from '../components/PostsTable';

function App() {
  return (
    <Container fluid>
      <h1 className="text-center">Listado de Posts</h1>
      <PostsTable/>
    </Container>
  );
}

export {App};
