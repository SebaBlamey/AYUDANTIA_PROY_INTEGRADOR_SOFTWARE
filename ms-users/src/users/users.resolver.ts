import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PurchaseInput } from "./dto/purchase.input";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: "GetAllUsers" })
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: "user" })
  async getUserById(id: string) {
    return await this.usersService.findOne(+id);
  }

  @Mutation(() => User)
  async createUser(@Args("createUserDto") createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Mutation(() => Boolean)
  async purchaseCatalog(
    @Args("purchaseCatalogInput") purchaseCatalogInput: PurchaseInput,
  ) {
    return await this.usersService.PurchaseCatalog(purchaseCatalogInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args("id") id: number,
    @Args("updateUserDto") updateUserDto: CreateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }
}
