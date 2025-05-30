import axios from "@/src/libs/axios";
import { TGatesResponse } from "./gate.response";
import { GATE_LIST_URL } from "./gate.constant";
import { TGatesFilterParams } from "./gate.request";

export const gates = async (params?: TGatesFilterParams) => {
  try {
    const response = await axios.get<TGatesResponse>(GATE_LIST_URL, { params });
    
    return response.data;
  } catch (err) {
    throw new Error("Network error occurred");
  }
};
