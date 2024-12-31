import axios from "axios";
import toast from "react-hot-toast";

export const handleAPIError = (error: unknown) => {
  const errorMessage =
    axios.isAxiosError(error) && error.response?.data?.message
      ? error.response?.data?.message
      : "An unknown error occurred during the roasting process.";
  toast.error(errorMessage);
};
