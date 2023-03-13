import React from "react";
import { Container } from 'react-bootstrap';
import { PostsTable } from '../components/PostsTable';

// Componente que renderiza el Inicio de la App
function App() {
  return (
    <Container fluid>
      <h1 className="text-center mb-4 mt-5">LISTADO DE POSTS 📚</h1>
      <PostsTable />
    </Container>
  );
}

export { App };
