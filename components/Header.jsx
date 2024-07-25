"use client";
import React, { useEffect, useState } from "react";
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
import Lottie from "lottie-react";
import Bell from "@/Bell.json";
import { useCallContext } from "@/context/CallContext";

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
          <Link href={"/user/friends"}>Your Friends</Link>
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
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { headerRefresh } = useCallContext();
  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/user/${session?.data?.user?.id}`);
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            // Check if component is still mounted before updating state
            setUserDetails(data);
          }
        } else {
          setError("Failed to fetch user details");
        }
      } catch (error) {
        console.log("Error fetching user details");
      } finally {
        if (isMounted) {
          // Update loading state only if component is still mounted
          setLoading(false);
        }
      }
    };

    fetchUserDetails();

    // Cleanup function to handle unmounting
    return () => {
      isMounted = false; // Set flag to false when component unmounts
    };
  }, [session, headerRefresh]);

  return (
    <>
      <header className="mx-auto bg-gray-200 dark:bg-gray-800 z-10 relative">
        <div className="container py-3 items-center flex justify-between">
          <Link
            href="/browse"
            className="flex text-xl gap-1 justify-center items-center"
          >
            <Image src="/icon.png" alt="logo" width={50} height={50} />
            Dev-Seeker
          </Link>

          <div className="flex justify-center gap-4 items-center">
            {session.data ? (
              <div className="flex items-center justify-between">
                {loading === false && (
                  <div className="flex gap-4">
                    <div className="flex items-center border border-gray-700 rounded-lg">
                      <div className="p-2 px-5 bg-gray-700 rounded-l-lg">
                        <Coins />
                      </div>
                      <div className="p-2 px-5">{userDetails.totalcoins}</div>
                    </div>
                    <div className="relative">
                      <Link href={"/user/notification"}>
                        {userDetails?.notification?.length > 0 && (
                          <div className="bg-red-500 text-white text-xs font-bold w-[1.2rem] h-[1.2rem] flex items-center justify-center rounded-full absolute top-1 right-2 transform translate-x-1/2 -translate-y-1/2">
                            {userDetails?.notification?.length}
                          </div>
                        )}

                        <Lottie
                          animationData={Bell}
                          loop={userDetails?.notification?.length > 0}
                          className="w-[40px] h-[40px]"
                        />
                      </Link>
                    </div>
                  </div>
                )}
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
