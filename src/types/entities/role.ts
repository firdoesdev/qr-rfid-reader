import { TPermission } from "./permission"

export type  TRole ={
    id: string
    name: string
    key: string
    permissions: TPermission[]
    is_active: boolean
}