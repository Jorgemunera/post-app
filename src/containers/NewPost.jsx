import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/styleText.css';

const NewPost = () => {

    // Estado para datos que recibimos en los inputs del formulario
    const [data, setData] = useState({
        userId: '',
        title: '',
        body: ''
    });

    const handleChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        })
    }

    // Petición POST con axios cuando ocurre el evento onSubmit del formulario (click en botón crear)
    const URL = "https://jsonplaceholder.typicode.com/posts"

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(URL, data);
            if (res.status === 201) {
                Swal.fire(
                    '¡Bien Hecho!',
                    `Se ha publicado tu post ${res.data.title}`,
                    'success'
                )
            }
            navigate('/');
        } catch (err) {
            Swal.fire(
                '¡Ups!',
                'Algo salió mal',
                'error'
            )
        }
    }

    // useNavigate para retornar al inicio cuando se de click en cancelar
    const navigate = useNavigate();

    const handleCancelButtonClick = (path) => {
        navigate(path);
    };

    return (
        <Container>
            <h1 className="text-center mb-4 mt-5 style-text">¡ CREA TU POST 🤓!</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className='style-text'>ID Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        name='userId'
                        placeholder="Digite su usuario"
                        value={data.userId}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className='style-text'>Título</Form.Label>
                    <Form.Control
                        type="text"
                        name='title'
                        placeholder="Digite un título"
                        value={data.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className='style-text'>Contenido</Form.Label>
                    <Form.Control
                        as="textarea"
                        name='body'
                        placeholder="Escribe tu post :D"
                        value={data.body}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-success mx-2'>Crear</button>
                    <button className='btn btn-danger mx-2' onClick={() => handleCancelButtonClick('/')}>Cancelar</button>
                </div>
            </Form>
        </Container>
    );
}

export { NewPost }