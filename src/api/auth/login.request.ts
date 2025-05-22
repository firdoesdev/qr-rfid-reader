import { TUser } from "@/src/types/entities/user";

export type TLoginRequest = Pick<TUser, "email"> & {
  password: string;
};
