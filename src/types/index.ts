export type GithubAPIResponse = {
  message: string;
  status: string;

  id: number;
  name: string;
  company: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  created_at: string;
};
