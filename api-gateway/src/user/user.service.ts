import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { last, lastValueFrom } from 'rxjs';
import { gql } from 'apollo-server-core';
import CreateUserDto from './input/create-user-input';
import PurchaseCatalogDto from './input/purchase-catalog.input';

@Injectable()
export class UserService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = `${process.env.USER_MS_ENDPOINT}/graphql`;
  }

  async findAll() {
    const query = gql`
      query {
        GetAllUsers {
          id
          name
          email
          isActive
          purchase
        }
      }
    `;

    console.log(`Haciendo la solicitud a ${this.baseUrl}`);
    const response = await lastValueFrom(
      this.httpService.post(this.baseUrl, { query: query.loc.source.body }),
    );
    console.log(response.data.data.GetAllUsers);

    return response.data.data.GetAllUsers;
  }

  async findOne(id: string) {
    const query = gql`
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
          email
          isActive
          purchase
        }
      }
    `;

    const response = await lastValueFrom(
      this.httpService.post(
        this.baseUrl,
        {
          query: query.loc.source.body,
          variables: { id },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    return response.data.data.user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const mutation = gql`
      mutation CreateUser($createUserDto: CreateUserDto!) {
        createUser(createUserDto: $createUserDto) {
          id
          name
          email
          password
          isActive
          purchase
        }
      }
    `;
    const response = await lastValueFrom(
      this.httpService.post(
        this.baseUrl,
        {
          query: mutation.loc.source.body,
          variables: { createUserDto },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    return response.data.data.createUser;
  }

  async purchaseCatalog(purchaseCatalogDto: PurchaseCatalogDto) {
    const mutation = gql`
      mutation PurchaseCatalog($purchaseCatalogInput: PurchaseInput!) {
        purchaseCatalog(purchaseCatalogInput: $purchaseCatalogInput)
      }
    `;

    const response = await lastValueFrom(
      this.httpService.post(
        this.baseUrl,
        {
          query: mutation.loc.source.body,
          variables: { purchaseCatalogInput: purchaseCatalogDto },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    return response.data.data.purchaseCatalog;
  }
}
