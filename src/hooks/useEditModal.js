import { useState } from "react";

const useEditModal = () => {
  // Estado para ocultar o mostrar el EditModal
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  return [showEditModal, handleCloseEditModal, handleShowEditModal]
}

export { useEditModal }
