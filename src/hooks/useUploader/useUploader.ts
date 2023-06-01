import axios from "axios";
import { useApi } from "../Apis";
import { toast } from "react-toastify";

export const useUploader = () => {
  const { fisioApi } = useApi();

  const getPresinedUrl = async (extention: string) => {
    try {
      const response = await fisioApi.post("/uploads", {
        extention,
      });

      return response.data.url;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const upload = async (file: File) => {
    const extention = file.name.split(".").pop();

    const formData = new FormData();

    formData.append("file", file);

    const url = await getPresinedUrl(extention!);

    const fileData = formData.get("file");

    if (!url) {
      toast.error("Erro ao obter url");
      return;
    }

    const options = {
      onUploadProgress: (progressEvent: any) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
      },
    };

    try {
      const response = await axios.put(url, fileData, options);
      console.log(response);
      return url.split("?")[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    upload,
  };
};
