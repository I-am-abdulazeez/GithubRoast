import { useState, useCallback, useEffect } from "react";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Switch } from "@nextui-org/switch";

import toast from "react-hot-toast";

import DefaultLayout from "@/layouts/default";

import RoastCard from "@/components/ui/roast-card";

import { fetchProfile } from "@/helpers/fetch-profile";
import { generateRoast } from "@/helpers/generate-roast";
import { handleAPIError } from "@/helpers/handle-error";

import { RealtimeResponseEvent } from "appwrite";
import {
  checkAndCreateUser,
  client,
  fetchRoastedCount,
} from "@/services/appwrite";

import { GithubAPIResponse } from "@/types";

export default function RoastPage() {
  const [username, setUsername] = useState("");
  const [soundNigerian, setSoundNigerian] = useState(false);
  const [roastedBio, setRoastedBio] = useState<GithubAPIResponse | undefined>(
    undefined
  );
  const [roastRes, setRoastRes] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [roastedCount, setRoastedCount] = useState<number>(0);

  // Fetch the count of roasted users on page load
  useEffect(() => {
    fetchRoastedCount(setRoastedCount);

    const unsubsribe = client.subscribe(
      ["databases.roasted_users.users.create"],
      (response: RealtimeResponseEvent<unknown>) => {
        if (response.events[0] === "documents.create") {
          setRoastedCount((prevCount) => prevCount + 1);
        }
      }
    );
    return () => unsubsribe();
  }, []);

  const fetchAndGenerateRoast = async () => {
    try {
      const profileResponse = await fetchProfile(username);
      setRoastedBio(profileResponse);

      if (!profileResponse) {
        return;
      }

      // Proceed to generate roast if profile is valid
      const roastResponse = await generateRoast(
        username,
        profileResponse.bio,
        soundNigerian,
        profileResponse.location,
        profileResponse.followers,
        profileResponse.public_repos,
        profileResponse.following
      );

      if (roastResponse.success) {
        setRoastRes(roastResponse.data);

        await checkAndCreateUser(username, setRoastedCount);
      } else {
        toast.error(roastResponse?.message!);
      }
    } catch (error) {
      handleAPIError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoast = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!username.trim()) {
        toast.error("Please enter a valid GitHub username.");
        return;
      }
      setIsLoading(true);
      fetchAndGenerateRoast();
    },
    [username, soundNigerian, roastedBio, roastRes]
  );

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center">
        <img
          src="/roastme.jpeg"
          alt="Roast Me!"
          className="w-48 rounded-xl mb-2 mt-[6rem]"
        />
        <div>
          <h2 className="text-medium font-medium text-center mb-2 text-white">
            {roastedCount > 0
              ? `Roasted ${roastedCount} Profile(s) globally.`
              : "No bios roasted yet. Start roasting now!"}
          </h2>
        </div>
        <form
          onSubmit={handleRoast}
          className="w-full max-w-sm flex flex-col gap-4 items-center"
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Enter username"
            placeholder="e.g: I-am-abdulazeez"
            radius="sm"
            size="lg"
            type="text"
          />
          <div className="self-start">
            <Switch
              color="danger"
              isSelected={soundNigerian}
              onValueChange={setSoundNigerian}
              classNames={{ label: "font-medium text-[12px] text-white" }}
              size="sm"
            >
              Roast me like a Naija mum
            </Switch>
          </div>
          <Button
            type="submit"
            radius="sm"
            size="lg"
            fullWidth
            color="default"
            className="font-semibold"
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Roasting..." : "🔥 Roast me!"}
          </Button>
        </form>
        <div className="my-5">
          {roastRes && (
            <RoastCard roastRes={roastRes} roastedBio={roastedBio} />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
