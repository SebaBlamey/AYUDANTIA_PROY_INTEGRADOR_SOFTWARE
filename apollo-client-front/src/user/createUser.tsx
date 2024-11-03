import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER, GET_ALL_USERS } from './userQueries';
import './createUserStyle.css';
import swal from 'sweetalert';

interface FormData {
  email: string; 
  name: string;
  password: string;
}

const CreateUserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  // Usar el hook useMutation
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    // Actualizar la caché después de crear un usuario
    refetchQueries: [{ query: GET_ALL_USERS }],
    onError: (error) => {
      console.error('Error al crear el usuario:', error);
    },
    onCompleted: () => {
      // Limpiar el formulario y mostrar mensaje de éxito
      setFormData({ name: '', email: '', password: '' });
      swal("¡Éxito!", "Usuario creado correctamente.", "success");
    }
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Conectando a:', process.env.API_URL);
    console.log('Datos del formulario:', formData);

    try {
      await createUser({
        variables: {
          createUserDto: formData,
        },
      });
    } catch (err) {
      // Los errores son manejados por el hook useMutation
      console.error('Error adicional:', err);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Crear Usuario</h2>
      <form onSubmit={handleCreate}>
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="form-input"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Creando...' : 'Crear Usuario'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          Error al crear usuario: {error.message || 'Error desconocido'}
        </div>
      )}
    </div>
  );
};

export default CreateUserForm;