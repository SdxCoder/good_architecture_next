// src/shared/query/query-client.ts

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
        },
        mutations: {
            // You can add mutation defaults here if needed
        }
    },
});