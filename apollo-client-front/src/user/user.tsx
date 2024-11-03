import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './userStyle.css';

interface User {
  id: string;
  email: string;
  name: string;
}

export const GET_ALL_USERS = gql`
  query GetAllUsersQuery {
    findAll {
      id
      email
      name
      isActive
    }
  }
`;

const UserList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <div className="error-message">Error: {error.message}</div>;

  // Accede a los usuarios usando data.findAll
  const users = data.findAll;

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">Usuarios</h2>
      <div className="user-grid">
        {users.map((user: User) => (
          <div key={user.id} className="user-card">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-email">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
