import type { User } from "./User";

export type Bid = {
  user: User;
  bid: number;
  time: Date;
};
