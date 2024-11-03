// CatalogList.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATALOGS } from './catalogQueries';
import './catalogStyle.css';

interface Catalog {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
}

const CatalogList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CATALOGS);

  if (loading) return <p>Cargando catálogos...</p>;
  if (error) return <div className="error-message">Error: {error.message}</div>;

  // Cambia 'catalogs' a 'findAllCatalog' para acceder a los datos correctamente
  const catalogs = data?.findAllCatalog || []; // Asegúrate de que catalogs sea un array

  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Catálogo de Productos</h2>
      <div className="catalog-grid">
        {catalogs.length > 0 ? (
          catalogs.map((item: Catalog) => (
            <div key={item.id} className="catalog-card">
              <h3 className="catalog-name">{item.name}</h3>
              <p className="catalog-description">{item.description}</p>
              <div className="catalog-details">
                <span className="catalog-price">${item.price.toFixed(2)}</span>
                <span className="catalog-stock">Stock: {item.stock}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No hay catálogos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default CatalogList;
