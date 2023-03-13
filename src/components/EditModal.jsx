import React from 'react';
import {Button, Form, Modal } from 'react-bootstrap';

const EditModal = ({
  showEditModal,
  handleCloseEditModal,
  handleSubmitEdit,
  dataModal,
  handleChangeModal }) => {

  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitEdit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name='title'
              value={dataModal ? dataModal.title : ''}
              autoFocus
              onChange={handleChangeModal}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Contenido</Form.Label>
              <Form.Control 
                  as="textarea"
                  name='body'
                  rows={3}
                  value={dataModal ? dataModal.body : ''}
                  onChange={handleChangeModal}
                  required
              />
          </Form.Group>
          <Modal.Footer>
              <Button variant="btn btn-secondary" type='button' onClick={handleCloseEditModal}>
                  Cacelar
              </Button>
              <Button variant="btn btn-success" type='submit' onClick={handleCloseEditModal}>
                  Guardar
              </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export { EditModal };
