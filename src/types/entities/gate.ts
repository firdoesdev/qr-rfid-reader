import { TArea } from "./area";
import { TLane } from "./lane";

export type TGate = {
    id: string,
    name: string,
    description: string | null,
    lanes?: TLane[],
    area?: TArea
    identity_gate:string
}