import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class PurchaseInput {
  @Field()
  @Column({ type: "int", nullable: false })
  userId: number;

  @Field()
  @Column({ type: "varchar", nullable: false })
  catalogId: string;

  @Field()
  @Column({ type: "int", nullable: false })
  quantity: number;
}
