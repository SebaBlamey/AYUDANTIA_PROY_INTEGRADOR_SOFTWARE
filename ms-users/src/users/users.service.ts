import { HttpException, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientProxy } from "@nestjs/microservices";
import { PurchaseInput } from "./dto/purchase.input";

@Injectable()
export class UsersService {
  constructor(
    @Inject("USER") private readonly rabbitClient: ClientProxy,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = createUserDto;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ where: { isActive: true } });
  }

  async findOne(id: number): Promise<User> {
    const userExisting = await this.userRepository.findOneBy({ id });
    if (!userExisting) {
      throw new Error("No se encontro usuario");
    }
    return userExisting;
  }

  async PurchaseCatalog(purchaseCatalogInput: PurchaseInput) {
    const existingUser = await this.userRepository.findOneBy({
      id: purchaseCatalogInput.userId,
    });
    if (!existingUser) {
      throw new HttpException("Usuario no encontrado", 404);
    }

    const response = this.rabbitClient.emit("purchase", purchaseCatalogInput);
    if (!response) {
      throw new HttpException("Error al realizar la compra", 500);
    }
    existingUser.purchase.push(purchaseCatalogInput.catalogId);
    await this.userRepository.save(existingUser);
    return true;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userExisting = await this.userRepository.findOneBy({ id });
    if (!userExisting) {
      throw new Error("No se encontro usuario");
    }
    return this.userRepository.save({ ...userExisting, ...updateUserDto });
  }

  async remove(id: number): Promise<User> {
    const userExisting = await this.userRepository.findOneBy({ id });
    if (!userExisting) {
      throw new Error("No se encontro usuario");
    }
    userExisting.isActive = false;
    return this.userRepository.save(userExisting);
  }
}
