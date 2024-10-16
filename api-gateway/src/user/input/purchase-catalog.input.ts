import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class PurchaseCatalogDto {
  @Field()
  catalogId: string;
  @Field()
  quantity: number;
  @Field()
  userId: number;
}
