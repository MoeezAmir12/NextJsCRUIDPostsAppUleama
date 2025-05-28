"use client";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { IQueryClientProviderWrapper } from "@/interfaces";

const ReactQueryProvider = ({ children } : IQueryClientProviderWrapper) => {
    const client = new QueryClient();
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}


export default ReactQueryProvider;