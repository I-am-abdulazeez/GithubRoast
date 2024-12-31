import { useState, useCallback, useEffect } from "react";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Switch } from "@nextui-org/switch";

import toast from "react-hot-toast";

import DefaultLayout from "@/layouts/default";

import RoastCard from "@/components/roast-card";

import { fetchProfile } from "@/helpers/fetch-profile";
import { generateRoast } from "@/helpers/generate-roast";
import { handleAPIError } from "@/helpers/handle-error";

import { GithubAPIResponse } from "@/types";

export default function RoastPage() {
  const [username, setUsername] = useState("");
  const [soundNigerian, setSoundNigerian] = useState(false);
  const [roastedBio, setRoastedBio] = useState<GithubAPIResponse | undefined>(
    undefined
  );
  const [roastRes, setRoastRes] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  // Maintain an array of roasted usernames
  const [roastedUsernames, setRoastedUsernames] = useState<string[]>(() => {
    const storedUsernames = localStorage.getItem("roastedUsernames");
    return storedUsernames ? JSON.parse(storedUsernames) : [];
  });

  useEffect(() => {
    localStorage.setItem("roastedUsernames", JSON.stringify(roastedUsernames));
  }, [roastedUsernames]);

  const handleRoast = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!username.trim()) {
        toast.error("Please enter a valid GitHub username.");
        return;
      }

      setIsLoading(true);

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
          setRoastedUsernames((prev) =>
            prev.includes(username) ? prev : [...prev, username]
          );
          setRoastRes(roastResponse.data);
        } else {
          toast.error(roastResponse?.message!);
        }
      } catch (error) {
        handleAPIError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [username, soundNigerian, roastedUsernames, roastedBio, roastRes]
  );

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <img
          src="/roastme.jpeg"
          alt="Roast Me!"
          className="w-48 rounded-xl mb-2"
        />
        <div>
          <h2 className="text-xl font-semibold text-center mb-2 text-white">
            {roastedUsernames.length > 0
              ? `Roasted ${roastedUsernames.length} Profile(s).`
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
            className="font-semibold text-lg"
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Roasting..." : "🔥 Roast me!"}
          </Button>
        </form>
        <div className="mt-5">
          {roastRes && (
            <RoastCard roastRes={roastRes} roastedBio={roastedBio} />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
