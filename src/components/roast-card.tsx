import { formatDate } from "@/helpers/format-date";
import { GithubAPIResponse } from "@/types";
import { User } from "@nextui-org/user";

type RoastCardProps = {
  roastedBio: GithubAPIResponse | undefined;
  roastRes: string;
  isModal?: boolean;
};

export default function RoastCard({
  roastedBio,
  roastRes,
  isModal = false,
}: RoastCardProps) {
  return (
    <div
      className={`w-full max-w-4xl ${isModal ? "border-gray-200 bg-white text-gray-700 p-2" : "bg-gray-900 text-white p-8"} rounded-lg`}
    >
      <User
        avatarProps={{
          src: roastedBio?.avatar_url,
        }}
        description={`Joined: ${formatDate(roastedBio?.created_at!)}`}
        name={roastedBio?.name}
      />
      <p className="mt-2">{roastRes}</p>
    </div>
  );
}
