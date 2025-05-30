import { TDevice } from "./device";

export type TLane = {
  id: string;
  devices?: TDevice[];
  gate_id: string | null;
  lane_name: string;
  lane_code: string;
};
