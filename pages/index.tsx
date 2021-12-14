import Head from "next/head";
import Image from "next/image";
import UserContext from "../components/userContext";
import { useAPI } from "../lib/fetcher";
import { User } from "../lib/userHook";
const styles = {};

export default function Home() {
  const { data } = useAPI<{
    matches: {
      id: string;
      User_Match_RecipientToUser: Partial<User>;
      User_Match_SenderToUser: Partial<User>;
    }[];
  }>("/matches");
  return (
    <UserContext.Consumer>
      {({ user }) =>
        user ? (
          <>
            <h1 className="p-4 max-w-screen-md mx-auto w-full flex gap-2 flex-col text-6xl">
              My Matches
            </h1>
            <ul className="p-4 max-w-screen-md mx-auto w-full flex gap-2 flex-col">
              {data?.matches?.map((match) => (
                <li key={match.id}>
                  <a
                    href={`/matches/${match.id}`}
                    className="p-5 py-3 bg-blue-600 text-white block shadow-lg rounded-full w-max"
                  >
                    {match?.User_Match_SenderToUser?.DiscordUsername ??
                      "Mystery Man"}{" "}
                    &rarr;
                    {match?.User_Match_RecipientToUser?.DiscordUsername}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <a
            href={`/api/login`}
            className="p-4 py-3 bg-blue-600 w-max mx-auto text-white rounded-lg"
          >
            Log in with discord
          </a>
        )
      }
    </UserContext.Consumer>
  );
}
