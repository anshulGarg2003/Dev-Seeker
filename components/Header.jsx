"use client";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./toggleButton";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coins, LogIn, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AcountDropDown() {
  const router = useRouter();
  const session = useSession();
  const handleClick = (e) => {
    if (!session) {
      e.preventDefault(); // Prevent navigation
      toast.error("Login First");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex gap-2 ">
        <Button variant={"link"}>
          <Avatar>
            <AvatarImage src={session?.data?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session?.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/user/${session?.data?.user?.id}`}>Your Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/user/edit"}>Edit Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/user/room"}>Your Rooms</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/friends"}>Your Friends</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = () => {
  const session = useSession();

  return (
    <>
      <header className="container mx-auto bg-gray-200 dark:bg-gray-800 z-10 relative">
        <div className=" py-3 items-center flex justify-between">
          <Link
            href="/browse"
            className="flex text-xl gap-1 justify-center items-center"
          >
            <Image src="/icon.png" alt="logo" width={50} height={50} />
            Dev-Seeker
          </Link>

          <div className="flex gap-4 justify-center items-center">
            {session.data ? (
              <div className="flex items-center gap-2 ">
                {/* <div className="flex items-center border border-gray-700 rounded-lg">
                  <div className="p-2 bg-gray-700  rounded-l-lg">
                    <Coins />
                  </div>
                  <div className="p-2">{session.data.user.coins}</div>
                </div> */}
                <AcountDropDown />
              </div>
            ) : (
              <p
                onClick={() => signIn("google")}
                className="flex cursor-pointer hover:underline gap-2"
              >
                <LogIn />
                Log In
              </p>
            )}
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
