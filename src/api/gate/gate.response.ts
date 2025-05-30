import { TResponseData, TResponsePaginate } from "@/src/types/commons/response"
import { TGate } from "@/src/types/entities/gate"
import { TUser } from "@/src/types/entities/user"

export type TGatesResponse = TResponsePaginate<TGate>