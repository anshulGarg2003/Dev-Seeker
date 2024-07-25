"use server";

import NewUser from "@/database/model/user2";
import connectToDatabase from "@/database/mongoose";
import { getSession } from "@/lib/auth";

export const sendFriendsRequest = async (userDetails) => {
  const session = await getSession();

  if (!session) {
    throw new Error("Your session has expired");
    return;
  }


  await connectToDatabase();

  const userIdToCheck = session?.user?.id;
  const sendToUser = await NewUser.findById(userDetails._id);
  const sendByUser = await NewUser.findById(userIdToCheck);

  if (!sendToUser) {
    throw new Error("User not found");
    return;
  }

  // Check if the userIdToCheck is in currUser.friends
  const isInFriends = sendToUser.friends.some((friend) =>
    friend.friendId.equals(userIdToCheck)
  );

  // Check if the userIdToCheck is in currUser.friendsRequests
  const isInFriendsRequests = sendToUser.friendsRequests.some((request) =>
    request.friendId.equals(userIdToCheck)
  );

  if (!isInFriends && !isInFriendsRequests) {
    const sendTofriend = {
      friendId: session?.user?.id,
      friendname: session?.user?.name,
      friendimage: session?.user?.image,
    };
    const sendByfriend = {
      friendId: userDetails._id,
      friendname: userDetails.name,
      friendimage: userDetails.image,
    };

    const notify = {
      code: 2,
      sendBy: session?.user?.name,
      data: "Friend",
      usefulId: session?.user?.id,
    };

    sendToUser.notification.unshift(notify);
    sendToUser.friendsRequests.push(sendTofriend);
    sendByUser.friendsRequestSend.push(sendByfriend);

    await sendToUser.save();
    await sendByUser.save();
    return true;
  }
  return false;
};
