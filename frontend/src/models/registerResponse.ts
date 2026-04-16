import type { User } from "./User";

export type RegisterResponse = User & {
    password: string,
}