"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import TagList from "@/components/tag-list";
import { splitTags } from "@/lib/utils";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Lottie from "lottie-react";
import Live from "@/Live.json";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export function RoomCard({ roomInfo }) {
  return (
    <>
      <Card
        className={
          "p-4 rounded-lg shadow-lg transition duration-300 hover:shadow-xl hover:border-fuchsia-800"
        }
      >
        <CardHeader className="relative">
          {roomInfo.isLive && (
            <div className="absolute top-1 right-1">
              <Lottie animationData={Live} />
            </div>
          )}
          <CardTitle>{roomInfo.name}</CardTitle>
          <CardDescription>{roomInfo.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {<TagList tags={splitTags(roomInfo?.language)} />}
        </CardContent>
        <CardContent>
          <p className="flex items-center gap-1">
            <Github />
            {
              <Link
                href={roomInfo.githubrepo}
                target="_blank"
                rel="noopener noreferrer"
              >
                {roomInfo.githubrepo}
              </Link>
            }
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={`/room/${roomInfo._id}`}>{"Join Room"}</Link>
          </Button>
        </CardFooter>
        <CardFooter className="flex flex-row gap-2">
          <Avatar className="flex gap-2">
            <AvatarImage src={roomInfo.userProfile || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Link href={`/user/${roomInfo.userId}`} className="hover:underline">
            {roomInfo.userName}
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
