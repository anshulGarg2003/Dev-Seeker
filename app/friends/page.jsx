"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Accept, Decline, FetchFriends } from "./actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import CircularLoader from "@/CircularLoader.json";
import Lottie from "lottie-react";

const page = () => {
  const session = useSession();
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [sendRequests, setSendRequests] = useState([]);
  const [acceptLoad, setAcceptLoad] = useState(false);
  const [declineLoad, setDeclineLoad] = useState(false);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await FetchFriends();
        setFriendRequestList(res.requests);
        setFriendList(res.friends);
        setSendRequests(res.sendrequest);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, []);

  const handleAccept = async (item) => {
    setAcceptLoad(true);
    console.log("Getting into functions");
    const res = await Accept(item);
    setAcceptLoad(false);
    if (res) {
      toast.success("The request is Accepted");
      window.location.reload();
    } else toast.error("Error occured while updating");
  };

  const handleDecline = async (item) => {
    setDeclineLoad(true);
    const res = await Decline(item);
    setDeclineLoad(false);

    if (res) {
      toast.success("The request is Declined");
      window.location.reload();
    } else toast.error("Error occured while updating");
  };
  return (
    <div className="flex p-10 w-full flex-col gap-5">
      <div className="min-h-[120px] flex flex-col w-full border border-gray-700 rounded-lg">
        <div className="rounded-t-lg w-full bg-gray-600">
          <p className="p-4 text-lg">Friends Requests</p>
        </div>
        {loading === true ? (
          <div className="flex justify-center items-center p-4 text-gray-400 font-semibold">
            Please wait while we are fetching...
          </div>
        ) : friendRequestList.length === 0 ? (
          <div className="flex justify-center items-center p-4 text-gray-400 font-semibold">
            You don't have any friend Requests
          </div>
        ) : (
          <div className="flex flex-col p-5">
            {friendRequestList.map((item) => (
              <div className="flex p-2 text-xl justify-between border-b mb-2 ">
                <div className="flex p-2 items-center gap-4">
                  <Avatar className="h-[70px] w-[70px]">
                    <AvatarImage src={item.friendimage} />
                    <AvatarFallback>{item.friendname.slice(1)}</AvatarFallback>
                  </Avatar>
                  <div className="text-gray-200 hover:underline hover:text-blue-500">
                    <Link href={`/user/${item.friendId}`}>
                      {item.friendname}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-4 mr-10">
                  <Button onClick={() => handleAccept(item)}>
                    {acceptLoad ? (
                      <Lottie
                        animationData={CircularLoader}
                        className="w-[40px] h-[40px]"
                      />
                    ) : (
                      "Accept"
                    )}
                  </Button>
                  <Button onClick={() => handleDecline(item)}>
                    {declineLoad ? (
                      <Lottie
                        animationData={CircularLoader}
                        className="w-[40px] h-[40px]"
                      />
                    ) : (
                      "Decline"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="min-h-[120px] flex flex-col w-full border border-gray-700 rounded-lg">
        <div className="rounded-t-lg w-full bg-gray-600">
          <p className="p-4 text-lg">Friends Requests Sends</p>
        </div>
        {loading === true ? (
          <div className="flex justify-center items-center p-4 text-gray-400 font-semibold">
            Please wait while we are fetching...
          </div>
        ) : sendRequests.length === 0 ? (
          <>
            <div className="flex justify-center items-center p-4 text-gray-400 font-semibold">
              You haven't send any friend Requests
            </div>
            <div className="flex justify-center items-center p-4 text-gray-400 font-semibold">
              Send Now
            </div>
          </>
        ) : (
          <div className="flex flex-col p-5">
            {sendRequests.map((item) => (
              <div className="flex p-2  text-xl justify-between border-b mb-2 ">
                <div className="flex items-center gap-4">
                  <Avatar className="h-[70px] w-[70px]">
                    <AvatarImage src={item.friendimage} />
                    <AvatarFallback>{item.friendname.slice(1)}</AvatarFallback>
                  </Avatar>
                  <div className="text-gray-200 hover:underline hover:text-blue-500">
                    <Link href={`/user/${item.friendId}`}>
                      {item.friendname}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-4 mr-10">
                  <Button onClick={() => handleAccept(item)}>
                    {acceptLoad ? (
                      <Lottie
                        animationData={CircularLoader}
                        className="w-[40px] h-[40px]"
                      />
                    ) : (
                      "Remove"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="min-h-[120px] flex flex-col w-full border border-gray-700 rounded-lg">
        <div className="flex rounded-t-lg w-full bg-gray-600 justify-between">
          <p className="p-4 text-lg">Your Friends</p>
          <p className="p-4 text-lg mr-20">
            {loading === false && friendList.length}
          </p>
        </div>
        {loading === true ? (
          <div className="flex justify-center items-center p-4 text-gray-400 font-semibold">
            Please wait while we are fetching...
          </div>
        ) : friendList.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-4 text-gray-400 font-semibold">
            <p>Your friend list is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4 p-5">
            {friendList.map((item) => (
              <>
                <div className="flex p-2 text-xl justify-between mb-2 ">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-[70px] w-[70px]">
                      <AvatarImage src={item.friendimage} />
                      <AvatarFallback>
                        {item.friendname.slice(1)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-gray-200 hover:underline hover:text-blue-500">
                      <Link href={`/user/${item.friendId}`}>
                        {item.friendname}
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
        <p className="flex justify-center items-center p-4 text-gray-400 font-semibold">
          Make more friends to solve your room faster
        </p>
      </div>
    </div>
  );
};

export default page;
