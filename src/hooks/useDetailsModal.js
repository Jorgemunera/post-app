import { useState } from "react";

const useDetailsModal = () => {
    // Estado para ocultar o mostrar el DetailsModal
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleCloseDetailsModal = () => setShowDetailsModal(false);
    const handleShowDetailsModal = () => setShowDetailsModal(true);

    return [showDetailsModal, handleCloseDetailsModal, handleShowDetailsModal]
}

export { useDetailsModal }