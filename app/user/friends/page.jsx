"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Accept, Decline, FetchFriends, RemoveRequest } from "./actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import CircularLoader from "@/CircularLoader.json";
import Lottie from "lottie-react";

const Page = () => {
  const session = useSession();
  const [friendList, setFriendList] = useState([]);
  const [friendListLoading, setFriendListLoading] = useState(true);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendRequestLoading, setFriendRequestLoading] = useState(true);
  const [sendRequests, setSendRequests] = useState([]);
  const [sendRequestLoading, setSendRequestLoading] = useState(true);

  const fetchFriendRequests = async () => {
    setFriendRequestLoading(true);
    try {
      const res = await FetchFriends();
      setFriendRequestList(res.requests);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    } finally {
      setFriendRequestLoading(false);
    }
  };

  const fetchFriends = async () => {
    setFriendListLoading(true);
    try {
      const res = await FetchFriends();
      setFriendList(res.friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setFriendListLoading(false);
    }
  };

  const fetchSendRequests = async () => {
    setSendRequestLoading(true);
    try {
      const res = await FetchFriends();
      setSendRequests(res.sendrequest);
    } catch (error) {
      console.error("Error fetching sent requests:", error);
    } finally {
      setSendRequestLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    fetchSendRequests();
  }, []);

  const handleAccept = async (item) => {
    const res = await Accept(item);
    if (res) {
      toast.success("The request is Accepted");
      fetchFriendRequests();
      fetchFriends();
    } else {
      toast.error("Error occurred while updating");
    }
  };

  const handleRemove = async (item) => {
    const res = await RemoveRequest(item);
    if (res) {
      toast.success("Request removed Successfully");
      fetchSendRequests();
    } else {
      toast.error("Error in removing");
    }
  };

  const handleDecline = async (item) => {
    const res = await Decline(item);
    if (res) {
      toast.success("The request is Declined");
      fetchFriendRequests();
    } else {
      toast.error("Error occurred while updating");
    }
  };

  return (
    <div className="flex p-10 w-full flex-col gap-5">
      <div className="min-h-[120px] flex flex-col w-full border border-gray-700 rounded-lg">
        <div className="rounded-t-lg w-full bg-gray-600">
          <p className="p-4 text-lg">Friends Requests</p>
        </div>
        {friendRequestLoading ? (
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
              <div
                key={item.friendId}
                className="flex p-2 text-xl justify-between border-b mb-2 "
              >
                <div className="flex p-2 items-center gap-4">
                  <Avatar className="h-[70px] w-[70px]">
                    <AvatarImage src={item.friendimage} />
                    <AvatarFallback>
                      {item.friendname.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-gray-200 hover:underline hover:text-blue-500">
                    <Link href={`/user/${item.friendId}`}>
                      {item.friendname}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-4 mr-10">
                  <Button onClick={() => handleAccept(item)}>Accept</Button>
                  <Button onClick={() => handleDecline(item)}>Decline</Button>
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
        {sendRequestLoading ? (
          <div className="flex justify-center items-center p-4 text-gray-400 font-semibold">
            Please wait while we are fetching...
          </div>
        ) : sendRequests.length === 0 ? (
          <>
            <div className="flex justify-center items-center p-4 text-gray-400 font-semibold">
              You haven't sent any friend Requests
            </div>
            <div className="flex justify-center items-center p-4 text-gray-400 font-semibold">
              Send Now
            </div>
          </>
        ) : (
          <div className="flex flex-col p-5">
            {sendRequests.map((item) => (
              <div
                key={item.friendId}
                className="flex p-2 text-xl justify-between border-b mb-2 "
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-[70px] w-[70px]">
                    <AvatarImage src={item.friendimage} />
                    <AvatarFallback>
                      {item.friendname.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-gray-200 hover:underline hover:text-blue-500">
                    <Link href={`/user/${item.friendId}`}>
                      {item.friendname}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-4 mr-10">
                  <Button onClick={() => handleRemove(item)}>Remove</Button>
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
            {friendListLoading === false && friendList.length}
          </p>
        </div>
        {friendListLoading ? (
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
              <div
                key={item.friendId}
                className="flex p-2 text-xl justify-between mb-2 "
              >
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-[70px] w-[70px]">
                    <AvatarImage src={item.friendimage} />
                    <AvatarFallback>
                      {item.friendname.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-gray-200 hover:underline hover:text-blue-500">
                    <Link href={`/user/${item.friendId}`}>
                      {item.friendname}
                    </Link>
                  </div>
                </div>
              </div>
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

export default Page;
