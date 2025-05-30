import axios from "@/src/libs/axios";
import { TResponseData } from "@/src/types/commons/response";
import { TUser } from "@/src/types/entities/user";
import { TLoginRequest } from "../login/login.request";
import { TLoginResponse } from "../login/login.response";

const AUTH_LOGIN_URL = "/auth/login";

export const login = async (credentials: TLoginRequest) => {
  try {
    const { data } = await axios.post<TLoginResponse>(
      AUTH_LOGIN_URL,
      credentials
    );
    return data;
  } catch (err) {
    throw new Error("Network error occurred");
  }
};
