import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Catalog } from './catalog-object';
import { CatalogService } from './catalog.service';
import CreateCatalogDto from './input/create-catalog-input';

@Resolver('Catalog')
export class CatalogResolver {
  constructor(private readonly catalogService: CatalogService) {}

  @Query(() => [Catalog])
  async findAllCatalog() {
    const catalogs = await this.catalogService.findAll();
    return catalogs;
  }

  @Query(() => Catalog)
  async findOneCatalog(@Args('id') id: string) {
    return await this.catalogService.findOne(id);
  }

  @Mutation(() => Catalog)
  async createCatalog(
    @Args('createCatalogDto') createCatalogDto: CreateCatalogDto,
  ) {
    await this.catalogService.createCatalog(createCatalogDto);
  }
}
