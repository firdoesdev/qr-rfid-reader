import axios from "@/src/libs/axios";
import { TVerificationTenantResponse } from "./verification-tenant.response";
import { VERIFICATION_TENANT_URL } from "./verification-tenant.constant";
import { TVerificationTenantFilterParams } from "./verification-tenant.request";
import { AxiosError } from "axios";

export const verificationTenant = async (documentId: string) => {
  console.log("Document ID Request:", documentId);
  try {
    const response = await axios.post<TVerificationTenantResponse>(
      VERIFICATION_TENANT_URL,
      { document_id: documentId }
    );

    console.log(`Request Verify Request`, response.request);

    return response.data;
  } catch (err: AxiosError) {
    console.error("Error in verificationTenant API:", err.request);
    console.log(`Request Verify Error: `, err);
    throw new Error("Network error occurred");
  }
};
