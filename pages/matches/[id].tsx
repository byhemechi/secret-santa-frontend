import { useRouter } from "next/router";
import useSWR from "swr";
import Message, { ApiMessage } from "../../components/message";
import UserContext from "../../components/userContext";
import fetcher, { useAPI } from "../../lib/fetcher";
import { User } from "../../lib/userHook";
import ms from "ms";
import React from "react";

const MatchPage = () => {
  const router = useRouter();
  const { data, error, mutate } = useSWR<{
    id: string;
    User_Match_RecipientToUser: Partial<User>;
    User_Match_SenderToUser: Partial<User>;
    Message: ApiMessage[];
  }>(
    `/matches/${router.query.id}`,
    (url) => fetcher(url).then(({ data }) => data),
    {
      refreshInterval: ms("5s"),
    }
  );

  const [message, setMessage] = React.useState<string>("");

  return (
    <main className="max-w-screen-md mx-auto w-full p-6 py-12 flex gap-4 flex-col flex-1">
      <h1 className={"text-4xl font-semibold"}>
        {data?.User_Match_SenderToUser?.DiscordUsername ?? "Mystery man"} &rarr;{" "}
        {data?.User_Match_RecipientToUser.DiscordUsername}
      </h1>
      <UserContext.Consumer>
        {({ user }) =>
          user?.DiscordID == data?.User_Match_SenderToUser.DiscordID ? (
            <div className="p-4 px-5 bg-gray-100 text-lg rounded-xl">
              <h2 className="font-semibold text-xl">You{"'"}re sending to</h2>
              <p>{data?.User_Match_RecipientToUser.Address}</p>
            </div>
          ) : (
            ""
          )
        }
      </UserContext.Consumer>
      <div className="flex flex-col justify-end flex-1 gap-3">
        {data?.Message.map((message) => (
          <Message
            {...message}
            key={message.Timestamp.toString() + message.User.toString()}
          />
        ))}
        {data?.Message?.length > 0 ? (
          ""
        ) : (
          <div className="text-center opacity-50">No messages</div>
        )}
        <form
          className="flex items-center justify-center gap-1"
          onSubmit={async (event) => {
            event.preventDefault();
            fetcher
              .put(`/messages/${router.query.id}`, {
                message,
              })
              .catch((err) => {
                console.error(err);
              })
              .then(() => {
                setMessage("");
                mutate();
              });
          }}
        >
          <input
            type="text"
            className="bg-white shadow-md rounded-full flex-1 p-2 px-4"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-600 p-2 rounded-full text-white flex items-center justify-center shadow-md"
            title="Send"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </form>
      </div>
    </main>
  );
};
export default MatchPage;
