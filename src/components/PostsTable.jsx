import React, { useEffect, useState } from 'react';
import { Container, Table, Pagination, InputGroup, Form } from 'react-bootstrap';
import { EditModal } from './EditModal';
import { DetailsModal } from './DetailsModal';
import axios from 'axios';
import Swal from 'sweetalert2';

const pageSize = 10;

const PostsTable = () => {
    const URL = "http://localhost:3004/posts";

    // Estado para guardar y modificar los Posts
    const [posts, setPosts] = useState([]);
    // Estado para ocultar o mostrar el EditModal
    const [showEditModal, setShowEditModal] = useState(false);
    // Estado para ocultar o mostrar el DetailsModal
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    // Estado para guardar la informacion del Post seleccionado
    const [dataModal, setDataModal] = useState(null);
    // Estado para manejar los terminos de busqueda
    const [searchTerm, setSearchTerm] = useState("");

    // Estado para detectar la pagina activa y funcion handle para detectar cuando la pagina cambia
    const [activePage, setActivePage] = useState(1);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedPosts = filteredPosts.slice((activePage - 1) * pageSize, activePage * pageSize);

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);

    const handleCloseDetailsModal = () => setShowDetailsModal(false);
    const handleShowDetailsModal = () => setShowDetailsModal(true);

    const handleChangeModal = ({ target }) => {
        setDataModal({
            ...dataModal,
            [target.name]: target.value
        })
    }

    // Función de mostrar detalles de un post, esta muestra la informacion del estado con los datos del post seleccionado y se abre el DetailsModal
    const handleDetails = (post) => {
        setDataModal(post);
        handleShowDetailsModal();
    }

    // Función de editar post, esta actualiza la informacion del estado con los datos del post seleccionado y se abre el EditModal
    const handleEdit = (post) => {
        setDataModal(post);
        handleShowEditModal();
    }

    // Una vez abierto el Modal, cuando se da en "guardar" se hace la peticion put a la API y se actualiza 
    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        const res = await axios.patch(`${URL}/${dataModal.id}`, dataModal);
        if (res.status === 200) {
            Swal.fire(
                'Guardado!',
                `El post ${res.data.title} ha sido actualizado exitosamente!`,
                'success'
            );
            // Buscar el post en el estado `posts` y actualizarlo
            setPosts(posts.map(post => {
                if (post.id === dataModal.id) {
                    return {
                        ...post,
                        ...dataModal
                    };
                }
                return post;
            }));
            handleCloseEditModal();
        } else {
            Swal.fire(
                'Error!',
                'Hubo un problema al actualizar el post!',
                'error'
            );
        }
    };

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

    useEffect(() => {
        setActivePage(1);
    }, [searchTerm]);

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
    }, [])

    return (
        <Container>
            <InputGroup size="lg" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Busca tu Post🔎</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange ={(e) => setSearchTerm(e.target.value)} 
                    value={searchTerm}
                />
            </InputGroup>
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th className="text-center align-middle">ID POST</th>
                        <th className="text-center align-middle">TÍTULO</th>
                        <th className="text-center align-middle" colSpan={3}>OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedPosts.map(post => (
                        <tr key={post.id}>
                            <td className="text-center align-middle">{post.id}</td>
                            <td className="text-center align-middle">{post.title}</td>
                            <td className="text-center align-middle">
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => handleDetails(post)}
                                >
                                    Detalles
                                </button>
                            </td>
                            <td className="text-center align-middle">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleEdit(post)}
                                >
                                    Editar
                                </button>
                            </td>
                            <td className="text-center align-middle">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(post)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="mt-4 justify-content-center">
                <Pagination.First
                    onClick={() => setActivePage(1)}
                    disabled={activePage === 1}
                />
                <Pagination.Prev
                    onClick={() => setActivePage(activePage - 1)}
                    disabled={activePage === 1}
                />
                {[...Array(Math.ceil(filteredPosts.length / pageSize))].map((_, i) => (
                    <Pagination.Item
                        key={i + 1}
                        active={i + 1 === activePage}
                        onClick={() => setActivePage(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => setActivePage(activePage + 1)}
                    disabled={activePage === Math.ceil(filteredPosts.length / pageSize)}
                />
                <Pagination.Last
                    onClick={() => setActivePage(Math.ceil(filteredPosts.length / pageSize))}
                    disabled={activePage === Math.ceil(filteredPosts.length / pageSize)}
                />
            </Pagination>
            <EditModal
                showEditModal={showEditModal}
                handleCloseEditModal={handleCloseEditModal}
                handleSubmitEdit={handleSubmitEdit}
                handleChangeModal={handleChangeModal}
                dataModal={dataModal}
            />
            <DetailsModal
                showDetailsModal={showDetailsModal}
                handleCloseDetailsModal={handleCloseDetailsModal}
                dataModal={dataModal}
            />
        </Container>
    );
}

export { PostsTable }