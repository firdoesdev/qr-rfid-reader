import { TResponseData } from "@/src/types/commons/response"
import { TUser } from "@/src/types/entities/user"

export type TLoginResponse = TResponseData<{
     user: TUser,
    token: string
}>