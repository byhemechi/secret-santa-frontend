import Link from "next/link";
import React from "react";
import UserContext from "./userContext";
import Image from "next/image";
import logo from "../public/ocebslogo.png";

const NavLink: React.FC<{ href: string; red?: boolean }> = ({
  href,
  children,
  red,
}) => (
  <Link href={href}>
    <a
      className={`p-3 py-2 hover:bg-gray-100 rounded block ${
        red ? "text-red-600" : "text-gray-800"
      }`}
    >
      {children}
    </a>
  </Link>
);

const Header = () => (
  <UserContext.Consumer>
    {({ user }) => (
      <header className="shadow">
        <nav className="max-w-screen-md mx-auto p-3 flex">
          <Link href="/">
            <a className="flex-1 h-10">
              <Image
                src={logo}
                height="40px"
                width="40px"
                alt="OCE Beat Saber"
              />
            </a>
          </Link>
          {user ? (
            <>
              <NavLink href="/">{user.DiscordUsername}</NavLink>
            </>
          ) : (
            <NavLink href="/api/login">Log In</NavLink>
          )}
        </nav>
      </header>
    )}
  </UserContext.Consumer>
);

export default Header;
