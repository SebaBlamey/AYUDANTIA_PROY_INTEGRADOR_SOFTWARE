import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { gql } from 'apollo-server-core';
import { lastValueFrom } from 'rxjs';
import CreateCatalogDto from './input/create-catalog-input';
import { queryObjects } from 'v8';
import { throws } from 'assert';
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';

@Injectable()
export class CatalogService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = `${process.env.CATALOG_MS_ENDPOINT}/query`;
  }

  async findAll() {
    const query = gql`
      query {
        catalogs {
          id
          name
          description
          stock
          price
          image
        }
      }
    `;
    console.log(`La query es ${query.loc.source.body}`);
    console.log(`Haciendo la solicitud a ${this.baseUrl}`);
    const response = await lastValueFrom(
      this.httpService.post(this.baseUrl, { query: query.loc.source.body }),
    );
    console.log(response.data.data.catalogs);
    return response.data.data.catalogs;
  }

  async findOne(id: string) {
    const query = gql`
      query Catalog($id: ID!) {
        catalog(id: $id) {
          id
          name
          description
          stock
          price
          image
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
    if (!response.data.data) {
      throw new HttpException('Catalog not found', 404);
    }
    return response.data.data.catalog;
  }

  async createCatalog(createCatalogDto: CreateCatalogDto) {
    const mutation = gql`
      mutation CreateCatalog($input: NewCatalog!) {
        createCatalog(input: $input) {
          id
          name
          description
          stock
          price
          image
        }
      }
    `;

    const response = await lastValueFrom(
      this.httpService.post(
        this.baseUrl,
        {
          query: mutation.loc.source.body,
          variables: { input: createCatalogDto },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    console.log(response.data.data.createCatalog);
    return response.data.data.createCatalog;
  }
}
