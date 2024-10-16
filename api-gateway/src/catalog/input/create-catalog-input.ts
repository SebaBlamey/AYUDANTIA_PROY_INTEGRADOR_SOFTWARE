import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CreateCatalogDto {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  stock: number;
  @Field()
  price: number;
  @Field()
  image: string;
}
