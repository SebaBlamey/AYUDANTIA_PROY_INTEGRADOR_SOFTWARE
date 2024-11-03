// CreateCatalogForm.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CATALOG, GET_CATALOGS } from './catalogQueries';
import './createCatalogStyle.css';
import swal from 'sweetalert';

interface CreateCatalogDto {
  name: string;
  description: string;
  stock: number;
  price: number;
  image?: string;
}

const CreateCatalogForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateCatalogDto>({
    name: '',
    description: '',
    stock: 0,
    price: 0,
    image: ''
  });

  const [createCatalog, { loading }] = useMutation(CREATE_CATALOG, {
    refetchQueries: [{ query: GET_CATALOGS }],
    onCompleted: () => {
      swal("¡Éxito!", "Producto creado correctamente.", "success");
      setFormData({
        name: '',
        description: '',
        stock: 0,
        price: 0,
        image: ''
      });
    },
    onError: (error) => {
      console.error('Error creating catalog:', error);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCatalog({
      variables: {
        createCatalogDto: formData
      }
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'stock' | 'price') => {
    const value = parseFloat(e.target.value);
    setFormData(prev => ({
      ...prev,
      [field]: isNaN(value) ? 0 : value
    }));
  };

  return (
    <div className="catalog-form-container">
      <h2 className="catalog-form-title">Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="catalog-form-group">
          <label className="catalog-form-label">Nombre del Producto</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="catalog-form-input"
            required
          />
        </div>

        <div className="catalog-form-group">
          <label className="catalog-form-label">Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="catalog-form-textarea"
            required
          />
        </div>

        <div className="catalog-form-group">
          <label className="catalog-form-label">Stock</label>
          <div className="number-input-container">
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => handleNumberChange(e, 'stock')}
              className="catalog-form-input number-input"
              min="0"
              required
            />
            <span>unidades</span>
          </div>
        </div>

        <div className="catalog-form-group">
          <label className="catalog-form-label">Precio</label>
          <div className="number-input-container">
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleNumberChange(e, 'price')}
              className="catalog-form-input number-input"
              min="0"
              step="0.01"
              required
            />
            <span>USD</span>
          </div>
        </div>

        <div className="catalog-form-group">
          <label className="catalog-form-label">URL de la imagen (opcional)</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="catalog-form-input"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="catalog-submit-button"
        >
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

export default CreateCatalogForm;
