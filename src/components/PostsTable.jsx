import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const PostsTable = () => {
    const URL = "http://localhost:3004/posts";

    // Estado para guardar y modificar los Posts
    const [posts, setPosts] = useState([]);
    // Estado para ocultar o mostrar el Modal
    const [showModal, setShowModal] = useState(false);
    // Estado para guardar la informacion del Post seleccionado
    const [selectedPost, setSelectedPost] = useState(null);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

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

    useEffect(() => {
        getPosts()
    }, [posts])

    // Función de eliminar POST, esta reacciona al evento de click del botón eliminar
    const handleDelete = async (post) => {
        Swal.fire({
            title: `Estas seguro de eliminar el Post ${post.title}?`,
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, elimínalo!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`${URL}/${post.id}`);
                    if (res.status === 200) {
                        Swal.fire(
                            '¡Post Eliminado!',
                            `Se ha eliminado tu post ${post.title}`,
                            'success'
                        )
                    }
                    const newPosts = posts.filter(p => p.id !== post.id);
                    setPosts(newPosts);
                } catch (err) {
                    Swal.fire(
                        '¡Ups!',
                        'Algo salió mal',
                        'error'
                    )
                }
            }
        })
    }

    // Función de editar POST, esta actualiza la informacion del estado con los datos del post seleccionado
    const handleEdit = (post) => {
        setSelectedPost(post);
        handleShowModal();
    }

    return (
        <Container>
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th className="text-center align-middle">ID POST</th>
                        <th className="text-center align-middle">TÍTULO</th>
                        <th className="text-center align-middle" colSpan={3}>OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td className="text-center align-middle">{post.id}</td>
                            <td className="text-center align-middle title">{post.title}</td>
                            <td className="text-center align-middle">
                                <button className='btn btn-info'>Detalles</button>
                            </td>
                            <td className="text-center align-middle">
                                <button className='btn btn-warning' onClick={() => handleEdit(post)}>Editar</button>
                            </td>
                            <td className="text-center align-middle">
                                <button className='btn btn-danger' onClick={() => handleDelete(post)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedPost ? selectedPost.title : ''}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Contenido</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3}
                                value={selectedPost ? selectedPost.body : ''}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="btn btn-secondary" type='button' onClick={handleCloseModal}>
                                Cacelar
                            </Button>
                            <Button variant="btn btn-success" type='submit' onClick={handleCloseModal}>
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export { PostsTable }