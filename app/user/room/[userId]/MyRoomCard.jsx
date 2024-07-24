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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Github, PencilIcon, Trash2Icon } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TagList from "@/components/tag-list";
import { splitTags } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import Lottie from "lottie-react";
import Live from "@/Live.json";

function getTimeDifferenceFromNow(timestamp) {
  const givenTime = new Date(timestamp);
  const currentTime = new Date();

  const diffInMilliseconds = currentTime - givenTime;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return diffInYears === 1 ? "a year ago" : `${diffInYears} years ago`;
  } else if (diffInMonths > 0) {
    return diffInMonths === 1 ? "a month ago" : `${diffInMonths} months ago`;
  } else if (diffInDays > 0) {
    return diffInDays === 1 ? "a day ago" : `${diffInDays} days ago`;
  } else if (diffInHours > 0) {
    return diffInHours === 1 ? "an hour ago" : `${diffInHours} hours ago`;
  } else if (diffInMinutes > 0) {
    return diffInMinutes === 1
      ? "a minute ago"
      : `${diffInMinutes} minutes ago`;
  } else {
    return "just now";
  }
}

export function MyRoomCard({ roomInfo, onDelete, loading }) {
  const memoizedTags = useMemo(
    () => splitTags(roomInfo?.language),
    [roomInfo?.language]
  );

  return (
    <Card>
      <CardHeader className="relative flex">
        {roomInfo.isLive && (
          <div className="absolute top-4 right-8">
            <Lottie animationData={Live} />
          </div>
        )}

        <CardTitle>
          {loading ? <Skeleton highlightColor="black" /> : roomInfo.name}
        </CardTitle>
        <CardDescription>
          {loading ? (
            <Skeleton count={3} highlightColor="black" />
          ) : (
            roomInfo.description
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton highlightColor="black" />
        ) : (
          <TagList tags={memoizedTags} />
        )}
      </CardContent>
      <CardContent>
        <p className="flex items-center gap-1">
          <Github />
          {loading ? (
            <Skeleton highlightColor="black" />
          ) : (
            <a
              href={roomInfo.githubrepo}
              target="_blank"
              rel="noopener noreferrer"
            >
              {roomInfo.githubrepo}
            </a>
          )}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 bottm-0 justify-start">
        <Button asChild>
          <Link href={loading ? "#" : `/room/${roomInfo._id}`}>
            {"Join Room"}
          </Link>
        </Button>
      </CardFooter>
      <CardFooter>
        {loading ? (
          <Skeleton count={3} highlightColor="black" />
        ) : (
          getTimeDifferenceFromNow(roomInfo.createdAt)
        )}
      </CardFooter>
    </Card>
  );
}
