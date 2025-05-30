import { TResponseData, TResponsePaginate } from "@/src/types/commons/response"
import { TCiesa } from "@/src/types/entities/ciesa"
import { TGate } from "@/src/types/entities/gate"
import { TUser } from "@/src/types/entities/user"

export type TVerificationTenantResponse = TResponseData<{message?: string}>