"use client";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./toggleButton";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();

  return (
    <>
      {session.data ? (
        <Button onClick={() => signOut()}>Sign Out</Button>
      ) : (
        <Button onClick={() => signIn("google")}>Sign In</Button>
      )}
      {session.data ? session.data.user.name : "NULL"}
      {/* <ModeToggle /> */}
    </>
  );
};

export default Header;
