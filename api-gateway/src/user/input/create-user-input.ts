import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CreateUserDto {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
