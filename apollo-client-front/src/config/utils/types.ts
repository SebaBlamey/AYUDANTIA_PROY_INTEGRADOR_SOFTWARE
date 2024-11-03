export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
  }
  
  export interface CreateUserResponse {
    name: string;
    email: string;
    password: string;
  }
  
  export interface GetAllUsersResponse {
    GetAllUsers: User[];
  }
  
  export interface CreateUserMutationResponse {
    createUser: CreateUserResponse;
  }
  
  export interface CreateUserMutationVariables {
    createUserDto: CreateUserDto;
  }


  export interface Catalog {
    id: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    image?: string;
  }
  
  export interface CreateCatalogInput {
    name: string;
    description: string;
    stock: number;
    price: number;
    image?: string;
  }
  
  export interface GetCatalogsResponse {
    catalogs: Catalog[];
  }
  
  export interface CreateCatalogMutationResponse {
    createCatalog: Catalog;
  }
  
  export interface CreateCatalogMutationVariables {
    input: CreateCatalogInput;
  }