import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", nullable: false })
  name: string;

  @Field()
  @Column({ type: "varchar", nullable: false })
  email: string;

  @Field()
  @Column({ type: "varchar", nullable: false })
  password: string;

  @Field()
  @Column({ type: "bool", default: true })
  isActive: boolean;

  @Field(() => [String])
  @Column({ type: "varchar", array: true, default: [] })
  purchase: string[];
}
