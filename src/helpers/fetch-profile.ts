import axios from "axios";

export const fetchProfile = async (username: string) => {
  const response = await axios.get(
    "https://linkedin-data-api.p.rapidapi.com/",
    {
      headers: {
        "X-RapidAPI-Key": "1ded6edae5msh13a9c5c0a9370b6p16875cjsn3fd90eb8d61a",
        "X-RapidAPI-Host": "linkedin-data-api.p.rapidapi.com",
      },
      params: { username },
    }
  );

  return response.data; // Axios automatically parses JSON
};
