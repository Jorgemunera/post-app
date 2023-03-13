import React from 'react';
import { Modal } from 'react-bootstrap';

const DetailsModal = ({
  showDetailsModal,
  handleCloseDetailsModal,
  dataModal,
 }) => {

  return (
    <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
      <Modal.Header closeButton>
        <Modal.Title>{dataModal ? dataModal.title : ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Autor: {dataModal ? dataModal.userId : ''}</h5>
        <h5>Post ID: {dataModal ? dataModal.id : ''}</h5>
        <p>{dataModal ? dataModal.body : ''}</p>
      </Modal.Body>
    </Modal>
  );
};

export { DetailsModal };
