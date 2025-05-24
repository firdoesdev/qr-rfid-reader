import { TGate } from "./gate";

export type TArea = {
  id: string;
  name: string;
  description: string | null;
  gates?: TGate[];
};
