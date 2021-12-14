import { createContext } from "react";
import type { User } from "../lib/userHook";

const UserContext = createContext<{
  user: Partial<User>;
}>({ user: null });

export default UserContext;
