import React from 'react';

import './App.css';
import CreateUserForm from './user/createUser';
import UserList from './user/user';
import CreateCatalogForm from './catalog/createCatalog';
import CatalogList from './catalog/catalog';
import { ApolloProvider } from '@apollo/client';
import client from './config/Graphql/apolloclient';


function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Mi Aplicación</h1>
        <CreateUserForm/>
        <UserList></UserList>
        <CreateCatalogForm></CreateCatalogForm>
        <CatalogList></CatalogList>
      </div>
      </ApolloProvider>
  );
}

export default App;