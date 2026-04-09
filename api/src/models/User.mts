import { model, Schema, Types, type InferSchemaType } from "mongoose";
import type { UserDto } from "./UserDto.mjs";

export const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model("User", userSchema);

//Skapar en typescript-typ baserat på userSchema
export type UserDbType = InferSchemaType<typeof userSchema> & { _id: Types.ObjectId};

//Gör om objekt från databasen till dto-objekt, för att ej skicka lösenord till frontend
export const convertToDto = (dataFromDb: UserDbType): UserDto => {
  return {
    username: dataFromDb.username,
    email: dataFromDb.email,
  } satisfies UserDto;
};

export default User;
