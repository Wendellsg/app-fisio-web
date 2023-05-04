import { useRef } from "react";
import { toast } from "react-toastify";
import { TypeOptions, ToastOptions } from "react-toastify/dist/types";

export const useFeedBack = () => {
  const toastId = useRef(null);

  const defaultOptions: ToastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const resolve = () => {
    if (toastId.current) {
      toast.dismiss(toastId.current);
    }
  };

  const feedBack = (type: TypeOptions, message: string) => {
    resolve();
    toastId.current = toast(message, {
      type,
      ...defaultOptions,
    });
  };

  const loading = (message: string) => {
    resolve();
    toastId.current = toast.loading(message, {
      ...defaultOptions,
    });
  };

  return {
    feedBack,
    loading,
  };
};
