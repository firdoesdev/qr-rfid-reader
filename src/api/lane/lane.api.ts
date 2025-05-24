import axios from "@/src/libs/axios";
import { TLanesResponse } from "./lane.response";
import { LANE_LIST_BY_GATE_URL } from "./lane.constant";
import { TLanesFilterParams } from "./lane.request";

export const lanes = async (gateId: string, params?: TLanesFilterParams) => {
  try {
    const response = await axios.get<TLanesResponse>(`${LANE_LIST_BY_GATE_URL}/${gateId}`, { params });

    return response.data;
  } catch (err) {
    throw new Error("Network error occurred");
  }
};
