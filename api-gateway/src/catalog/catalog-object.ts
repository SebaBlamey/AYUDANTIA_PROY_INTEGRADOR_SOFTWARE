import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Catalog {
  @Field(() => ID)
  id: string;

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
