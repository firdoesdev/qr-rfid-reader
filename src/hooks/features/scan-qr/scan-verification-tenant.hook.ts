import { useMutation } from "@tanstack/react-query";
import { verificationTenant } from "@/src/api/verification-tenant/verification-tenant.api";



const SCAN_VERIFICATION_TENANT_QUERY_KEY = "scan-verification-tenant";

export const useScanVerificationTenant = () => {
  const verification = useMutation({
    mutationKey: [SCAN_VERIFICATION_TENANT_QUERY_KEY],
    mutationFn: (documentId: string) => verificationTenant(documentId)
  });
  return verification;
};
