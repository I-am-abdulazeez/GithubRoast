import { GithubAPIResponse } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";

export const fetchProfile = async (username: string) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("GitHub API returned an error");
    }

    return response.data as GithubAPIResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      const errorMessage = error.response?.data?.message || "Profile not found.";
      toast.error(`${errorMessage}`);
    } else {
      toast.error("Failed to fetch profile data. Please try again.");
    }
  }
};
