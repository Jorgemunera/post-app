import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import {EditModal} from './EditModal';
import {DetailsModal} from './DetailsModal';
import axios from 'axios';
import Swal from 'sweetalert2';

const PostsTable = () => {
    const URL = "http://localhost:3004/posts";

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

    // Estado para guardar y modificar los Posts
    const [posts, setPosts] = useState([]);
    // Estado para ocultar o mostrar el EditModal
    const [showEditModal, setShowEditModal] = useState(false);
    // Estado para ocultar o mostrar el DetailsModal
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    // Estado para guardar la informacion del Post seleccionado
    const [dataModal, setDataModal] = useState(null);

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);

    const handleCloseDetailsModal = () => setShowDetailsModal(false);
    const handleShowDetailsModal = () => setShowDetailsModal(true);

    const handleChangeModal = ({target}) => {
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
                                <button className='btn btn-info' onClick={() => handleDetails(post)}>Detalles</button>
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