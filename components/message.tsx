import { User } from "../lib/userHook";
import UserContext from "./userContext";
import Image from "next/image";

export type ApiMessage = {
  Timestamp: string;
  Message: string;
  User: Partial<User>;
};

const Message: React.FC<ApiMessage & { children?: never }> = (message) => (
  <UserContext.Consumer>
    {({ user }) => (
      <div
        className={`flex ${
          user.DiscordID == message.User.DiscordID
            ? "flex-row-reverse"
            : "flex-row"
        } items-center gap-2`}
      >
        <Image
          src={`https://cdn.discordapp.com/avatars/${message.User.DiscordID}/${message.User.DiscordAvatar}.webp?size=100`}
          alt={message.User.DiscordUsername}
          className="w-12 rounded-full"
          width={48}
          height={48}
        />
        <div
          className={`w-max py-2 px-3 rounded-xl shadow-md ${
            user.DiscordID == message.User.DiscordID
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
          }`}
        >
          {message.Message}
        </div>
      </div>
    )}
  </UserContext.Consumer>
);

export default Message;
