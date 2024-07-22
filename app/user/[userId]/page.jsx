"use client";
import Lottie, { LottiePlayer } from "lottie-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "@/Loading.json";
import { CardBody, CardContainer, CardItem } from "@/components/3d-card";
import Link from "next/link";
import {
  Coins,
  CoinsIcon,
  Github,
  HomeIcon,
  PencilIcon,
  StarIcon,
  TimerIcon,
} from "lucide-react";
import { splitTags } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardBody as BottomCardBody,
  CardFooter,
} from "@nextui-org/card";

import coins from "@/coins.json";
import { sendFriendsRequest } from "./actions";
import toast from "react-hot-toast";

const dummy = "nextjs,reactjs,mongodb,nextauth,c++,testing,ui/ux,backend";

function MyTagList({ tags }) {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      {tags.map((lang) => (
        <Button
          className={cn(badgeVariants())}
          onClick={() => {
            router.push(`/browse/?search=${lang.toLowerCase()}`);
          }}
          key={lang}
        >
          {lang}
        </Button>
      ))}
    </div>
  );
}

const UserProfile = (props) => {
  const session = useSession();
  const userId = props.params.userId;
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [friendTag, setFriendTag] = useState("Send Friend Request");

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            // Check if component is still mounted before updating state
            setUserDetails(data);
            console.log(data);
          }
        } else {
          setError("Failed to fetch user details");
        }
      } catch (error) {
        setError("Error fetching user details");
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
  }, [userId, requestLoading]);

  const handleFriendRequest = async () => {
    setRequestLoading(true);
    const res = await sendFriendsRequest(userDetails);
    setRequestLoading(false);
    if (res == true) {
      toast.success("Request has been send");
    } else toast.success("Request has send Already");
  };

  useEffect(() => {
    const handleFriendFunc = () => {
      const userIdToCheck = session?.data?.user?.id;

      // Check if the userIdToCheck is in userDetails.friends
      const isInFriends = userDetails?.friends.some(
        (friend) => friend.friendId.toString() === userIdToCheck
      );
      if (isInFriends) {
        setFriendTag("Already a friend");
        return;
      }

      // Check if the userIdToCheck is in userDetails.friendsRequests
      const isInFriendsRequests = userDetails?.friendsRequests.some(
        (request) => request.friendId.toString() === userIdToCheck
      );
      if (isInFriendsRequests) {
        setFriendTag("Request already sent");
        return;
      }
      const isInFriendsRequestsSend = userDetails?.friendsRequestSend.some(
        (request) => request.friendId.toString() === userIdToCheck
      );
      if (isInFriendsRequestsSend) {
        setFriendTag("Request received");
        return;
      }
    };

    handleFriendFunc();
  }, [userDetails, session]);

  if (loading)
    return (
      <div className="absolue top-0">
        <Lottie animationData={Loading} />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div>
      <main className="flex p-5">
        <div className="flex">
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem translateZ="100" className="w-full mb-4">
                <Image
                  src={userDetails.image}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {userDetails.name}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {userDetails.email}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {userDetails.bio || "NA"}
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={`https://github/${userDetails.Github || ""}`}
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white flex gap-2 hover:underline items-center"
                >
                  <Github />
                  {userDetails.github || "GithubLink"}
                  <p>{"→"}</p>
                </CardItem>
                {userDetails._id !== session?.data?.user?.id && (
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    onClick={handleFriendRequest}
                  >
                    {requestLoading === true ? "Sending..." : friendTag}
                  </CardItem>
                )}
              </div>
            </CardBody>
          </CardContainer>
        </div>
        <div className="flex w-full p-10 relative">
          {userId === session?.data?.user?.id && (
            <Link href={"/user/edit"}>
              <PencilIcon className="absolute right-2 top-2" />
            </Link>
          )}
          <div className="inter-var py-4 items-center justify-center w-full bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-6 border">
            <div className="w-full flex flex-col gap-4">
              <div className="px-4 py-4 rounded-xl bg-black dark:bg-white dark:text-black text-white flex text-lg gap-2 shadow-lg transition duration-300 hover:shadow-xl hover:border-fuchsia-800">
                <div>Country:</div>
                <div className="font-bold">{userDetails.country || "NA"}</div>
              </div>
              <div className="px-4 py-4 rounded-xl bg-black dark:bg-white dark:text-black text-white flex text-lg gap-2">
                <div>Sutdent/Professional:</div>
                <div className="font-bold">{userDetails.role || "NA"}</div>
              </div>
              <div className="px-4 py-4 rounded-xl bg-black dark:bg-white dark:text-black text-white flex text-lg gap-2">
                <div>Institution:</div>
                <div className="font-bold">{userDetails.institute || "NA"}</div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-black dark:bg-white dark:text-black text-white flex text-lg gap-2 items-center">
                <div className="flex">Worked On:</div>
                <div className="overflow-hidden flex">
                  <MyTagList tags={splitTags(userDetails.tags || "")} />
                </div>
              </div>
              <div className="px-4 py-4 rounded-xl bg-black dark:bg-white dark:text-black text-white flex text-lg gap-2">
                <div>Rating:</div>
                <div className="font-bold flex items-center gap-2">
                  {userDetails.rating || 5}
                  <StarIcon />
                </div>
              </div>
              <div className="px-4 py-4 rounded-xl bg-black dark:bg-white dark:text-black text-white flex text-lg gap-2">
                <div>Time Spend:</div>
                <div className="font-bold flex items-center gap-2">
                  {userDetails.totaltime || 0}
                  <TimerIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <main className="flex w-full gap-4">
        <div
          className="flex px-10"
          style={{
            visibility:
              session?.data?.user?.id === userId ? "visible" : "hidden",
          }}
        >
          <Card className="w-[450px] rounded-md">
            <CardHeader className="flex gap-3 bg-gray-600 justify-between p-3">
              <div className="flex">
                <Lottie animationData={coins} className="w-10 h-10" />
                <div className="flex flex-col">
                  <p className="text-md">Seeker Coins</p>
                  <p className="text-sm">Earn while solving</p>
                </div>
              </div>
              <div className="flex gap-2">
                {userDetails.totalcoins}
                <CoinsIcon />
              </div>
            </CardHeader>
            <BottomCardBody className="bg-gray-800 min-h-5">
              {userDetails.transaction.length == 0 ? (
                <div>No transactions available</div>
              ) : (
                userDetails.transaction.map((statement) => (
                  <div className=" flex justify-between p-3">
                    <div className="flex flex-col">
                      {statement.status == 200 ? (
                        <p className="text-green-600">
                          {statement.name}... Room DELETE
                        </p>
                      ) : statement.status == 210 ? (
                        <p className="text-green-600">
                          {statement.name} Room SOLVE
                        </p>
                      ) : statement.status == 300 ? (
                        <p className="text-red-600">
                          {statement.name} Room CREATE
                        </p>
                      ) : (
                        <p className="text-red-600">
                          {statement.name} Room DISTRUB
                        </p>
                      )}
                      <p className="text-gray-500 text-sm">{statement.time}</p>
                    </div>
                    <p className="flex gap-2">
                      {statement.remaincoins}
                      <CoinsIcon />
                    </p>
                  </div>
                ))
              )}
            </BottomCardBody>
            <hr />
            <CardFooter className="bg-gray-800 text-gray-500">
              Last 10 transactions
            </CardFooter>
          </Card>
        </div>
        <div className="flex flex-[2]">
          <div className="flex flex-col rounded-md w-full pr-5">
            <div className="p-6 bg-[#4B5563]">Friends</div>

            <div className="overflow-x-scroll flex gap-4 p-6 bg-gray-800">
              <div className="flex rounded-[100px] border-[5px] ">
                <Image
                  src={userDetails.image}
                  width="130"
                  height="130"
                  alt="friend"
                  className="rounded-[100px]"
                />
              </div>
              <div className="flex rounded-[100px] border-[5px] ">
                <Image
                  src={userDetails.image}
                  width="130"
                  height="130"
                  alt="friend"
                  className="rounded-[100px]"
                />
              </div>
              <div className="flex rounded-[100px] border-[5px] ">
                <Image
                  src={userDetails.image}
                  width="130"
                  height="130"
                  alt="friend"
                  className="rounded-[100px]"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
