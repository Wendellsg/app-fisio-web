"use client";
import "react-toastify/dist/ReactToastify.css";


import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
        <ToastContainer position="bottom-right" />
        
        {children} </QueryClientProvider>
  );
};
