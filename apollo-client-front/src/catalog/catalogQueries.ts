// catalogQueries.ts
import { gql } from '@apollo/client';


export const GET_CATALOGS = gql`
  query {
    findAllCatalog {
      id
      name
      description
      stock
      price
    }
  }
`;

export const CREATE_CATALOG = gql`
  mutation($createCatalogDto: CreateCatalogDto!) {
    createCatalog(createCatalogDto: $createCatalogDto) {
      name
      description
      stock
      price
      image
    }
  }
`;
