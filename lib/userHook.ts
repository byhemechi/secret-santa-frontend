import { useAPI } from "./fetcher";

export type User = {
  id: number;
  DiscordID: string;
  Bio: string;
  Address: string;
  Country: string;
  DiscordUsername: string;
  DiscordAvatar: string;
  IsAdmin: boolean;
} | null;

const useUser = () => {
  const { data } = useAPI<Partial<User>>("/user/@me");
  return data == {} ? null : data;
};

export default useUser;
