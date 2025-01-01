import { Client, Databases, ID, Query } from 'appwrite';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';


const client = new Client();
client.setProject('6774c994003889e8cd0d');

const databases = new Databases(client);

const fetchRoastedCount = async (setRoastedCount: Dispatch<SetStateAction<number>>) => {
  try {
    const response = await databases.listDocuments(
      "roasted_users",
      "users"
    );
    setRoastedCount(response.total);
  } catch (error) {
    toast.error("Failed to fetch roasted count:");
  }
};

// Function to check if the user exists and create the document if not
const checkAndCreateUser = async (username: string, setRoastedCount: Dispatch<SetStateAction<number>>) => {
  try {
    const existingUser = await databases.listDocuments(
      "roasted_users",
      "users",
      [Query.equal("username", [username])]
    );

    if (existingUser.total === 0) {
      await databases.createDocument(
        "roasted_users",
        "users",
        ID.unique(),
        {
          username,
        }
      );
      setRoastedCount((prev) => prev + 1);
    }
  } catch (error) {
    console.error("Error while checking and creating user:", error);
  }
};


export { databases, client, fetchRoastedCount, checkAndCreateUser };
