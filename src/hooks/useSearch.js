import { useState, useEffect } from 'react';

const useSearch = (data) => {
  // Estado para manejar los terminos de busqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Filtrado de los posts de acuardo a los que coinciden con los que estan en el estado searcherm
  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  return [filteredData, searchTerm, setSearchTerm];
};

export {useSearch};
