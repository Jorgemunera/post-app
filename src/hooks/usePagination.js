import { useState } from 'react';

const usePagination = (data, pageSize) => {
  // Estado para detectar la pagina activa
  const [activePage, setActivePage] = useState(1);

  // Posts paginados de acuerd a 
  const paginatedPosts = data.slice((activePage - 1) * pageSize, activePage * pageSize);

  return [paginatedPosts, activePage, setActivePage];
};

export {usePagination};
