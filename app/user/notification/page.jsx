"use client";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchUserNotifications, RemoveNotification } from "./actions";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallContext } from "@/context/CallContext";

const page = () => {
  const [notifications, setNotifications] = useState([]);
  const { setHeaderRefresh } = useCallContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetchUserNotifications();
        setLoading(false);
        if (res === false) {
          toast.error("Error in fetching data");
          return;
        }
        setNotifications(res);
      } catch (err) {
        toast.error(err);
      }
    };
    fetchNotifications();
  }, []);

  const handleView = async (item) => {
    try {
      // Use toast.promise correctly with the promise and the messages
      await toast.promise(
        RemoveNotification(item), // The promise
        {
          loading: "Processing...",
          success: "Here we go..",
          error: "Error processing",
        }
      );

      // Update headerRefresh state after the promise is resolved
      setHeaderRefresh((prev) => !prev);

      // Redirect based on item code
      if (item.code === 1) {
        router.push(`/user/room/${item.usefulId}`);
      } else if (item.code === 2) {
        router.push(`/user/friends`);
      } else {
        router.push(`/user/${item.usefulId}`);
      }
    } catch (error) {
      console.error("Error handling view:", error);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="flex gap-3 text-center items-center text-2xl">
        <Bell className="w-[60px] h-[60px]" />
        <p>Your Notification</p>
        <p>{loading === false && `(${notifications.length})`}</p>
      </div>
      <div className="pt-5 flex justify-center items-center ">
        {loading ? (
          <div className="flex justify-center items-center p-4 text-gray-400 font-semibold">
            Please Wait while we are loading...
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex justify-center items-center p-4 text-gray-400 font-semibold">
            You dont have any latest notification...
          </div>
        ) : (
          <div className="w-[70%] flex flex-col justify-center gap-2 ">
            {notifications.map((notice) => (
              <div className="flex items-center ">
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <Image
                      src={
                        notice.code === 1
                          ? "/Room.svg"
                          : notice.code === 2
                          ? "/Friends.svg"
                          : "/payment.svg"
                      }
                      alt={
                        notice.code === 1
                          ? "Room Notification"
                          : notice.code === 2
                          ? "/Friends Request"
                          : "Payement Notification"
                      }
                      width="300"
                      height="500"
                      className="flex items-center justify-center"
                    />
                  </div>
                  <div className="flex justify-center items-center text-lg w-[50%]">
                    {notice.code === 1 ? (
                      <p>
                        Hey there! Your friend {notice.sendBy} just created a
                        room {notice.data}. Jump in, help them solve it, and
                        score some awesome rewards!
                      </p>
                    ) : notice.code === 2 ? (
                      <p>
                        Hey there! You have a new friend request from
                        {notice.sendBy}. Connect now and start collaborating on
                        exciting projects together!
                      </p>
                    ) : notice.code === 3 ? (
                      <p>
                        Hey there! "{notice.data}" room has been created, and
                        your coins have been updated. Dive in and start
                        collaborating on new challenges!
                      </p>
                    ) : notice.code === 4 ? (
                      <p>
                        Good news! You've earned coins for deleting the "
                        {notice.data}" room. Check your account and enjoy your
                        rewards!
                      </p>
                    ) : (
                      <p>
                        Welcome aboard! To get you started, we've gifted you 100
                        coins. Enjoy exploring and making the most out o f your
                        new journey with us!
                      </p>
                    )}
                  </div>
                  <Button
                    className="flex items-center"
                    onClick={() => handleView(notice)}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
