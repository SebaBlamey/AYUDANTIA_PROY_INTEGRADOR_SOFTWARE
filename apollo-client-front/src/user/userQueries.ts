// userQueries.ts
import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    findAll {
      id
      email
      name
    }
  }
`;
export const CREATE_USER = gql`
  mutation($createUserDto: CreateUserDto!) {
    createUser(createUserDto: $createUserDto) {
      id
    }
  }
`;
