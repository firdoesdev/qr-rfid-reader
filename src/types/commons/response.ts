import { AxiosError } from "axios";

export type TResponsePaginate<T> = {
  status_code: number;
  data: {
    items: T[];
    meta: {
      page: number;
      per_page: number;
      total: number;
      total_page: number;
    };
  };
  version: string;
  message: string;
};

export type TResponseData<T> = {
  status_code: number;
  data: T;
  version: string;
  message: string;
};

export type TResponseError = AxiosError<{
  status_code: number;
  error_message: string;
  stack_trace: string;
  error?: string;
  message?: string;
  errors?: {
    key: string;
    message: string;
    path: string;
    messages: string[];
  }[];
  version: string;
}>;