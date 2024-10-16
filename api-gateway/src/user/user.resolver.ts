import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user-object';
import CreateUserDto from './input/create-user-input';
import PurchaseCatalogDto from './input/purchase-catalog.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Query(() => User)
  async findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Mutation(() => Boolean)
  async purchaseCatalog(
    @Args('purchaseCatalogDto') purchaseCatalogDto: PurchaseCatalogDto,
  ) {
    return this.userService.purchaseCatalog(purchaseCatalogDto);
  }
}
