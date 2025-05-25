import { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ReactQueryClientProvider({ children }: PropsWithChildren) {


  return (
    <QueryClientProvider client={queryClient}>
      
        {children}
    </QueryClientProvider>
  );
}
