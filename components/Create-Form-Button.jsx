"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust import as necessary
import toast from "react-hot-toast";

const CreateRoomButton = () => {
  const { data: session } = useSession();

  const handleClick = (e) => {
    if (!session) {
      e.preventDefault(); // Prevent navigation
      toast.error("Login First");
    }
  };

  return (
    <div className="flex justify-between px-10">
      <h2>Having a problem in anything??</h2>
      <Button onClick={handleClick}>
        {session ? (
          <Link href="/create-room">Create Room</Link>
        ) : (
          "Create Room" // Display text if session is not present
        )}
      </Button>
    </div>
  );
};

export default CreateRoomButton;
