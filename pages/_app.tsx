import Header from "../components/header";
import UserContext from "../components/userContext";
import useUser from "../lib/userHook";
import "../styles/globals.css";

function SecretSantaApp({ Component, pageProps }) {
  const user = useUser();
  return (
    <UserContext.Provider value={{ user }}>
      <Header />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default SecretSantaApp;
