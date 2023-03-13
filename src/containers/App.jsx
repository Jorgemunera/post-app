import React from "react";
import { Container } from 'react-bootstrap';
import { PostsTable } from '../components/PostsTable';
import '../styles/App.css';

// Componente que renderiza el Inicio de la App
function App() {
  return (
    <Container fluid className="App">
      <h1 className="text-center mb-4 mt-5 style-text">LISTADO DE POSTS 📚</h1>
      <PostsTable />
    </Container>
  );
}

export { App };
