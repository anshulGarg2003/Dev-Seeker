"use server";
import NewUser from "@/database/model/user2";
import connectToDatabase from "@/database/mongoose";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function FetchFriends() {
  const session = await getSession();
  if (!session) {
    throw new Error("Your session has expired");
  }
  const userId = session?.user?.id;

  await connectToDatabase();

  try {
    const user = await NewUser.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Convert ObjectId to string
    const requests = JSON.parse(JSON.stringify(user.friendsRequests));
    const friends = JSON.parse(JSON.stringify(user.friends));
    const sendrequest = JSON.parse(JSON.stringify(user.friendsRequestSend));

    return { requests, friends, sendrequest };
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

export const Accept = async (item) => {
  // console.log(item);
  const session = await getSession();
  if (!session) {
    throw new Error("Your session has expired");
  }

  const userId = session?.user?.id;
  await connectToDatabase();

  try {
    console.log("Hello");
    const user = await NewUser.findById(userId);
    const userItem = await NewUser.findById(item.friendId);
    if (!user || !userItem) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the item already exists in friends
    const alreadyFriend = user.friends.some((friend) =>
      friend.friendId.equals(item.friendId)
    );
    if (!alreadyFriend) {
      user.friends.push(item);
      const sendTofriend = {
        friendId: session?.user?.id,
        friendname: session?.user?.name,
        friendimage: session?.user?.image,
      };
      userItem.friends.push(sendTofriend);
    }

    // Filter out the accepted friend request
    user.friendsRequests = user.friendsRequests.filter(
      (request) => !request.friendId.equals(item.friendId)
    );
    userItem.friendsRequestSend = userItem.friendsRequestSend.filter(
      (request) => !request.friendId.equals(userId)
    );
    // console.log(user);
    // console.log(userItem);
    await user.save();
    await userItem.save();

    revalidatePath("/friends");
    return true;
  } catch (error) {
    console.error("Error in Accept function:", error);
    return false;
  }
};

export const Decline = async (item) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Your session has expired");
  }

  const userId = session?.user?.id;
  await connectToDatabase();

  try {
    const user = await NewUser.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Filter out the accepted friend request
    user.friendsRequests = user.friendsRequests.filter(
      (request) => !request.friendId.equals(item.friendId)
    );
    // console.log(user);
    await user.save();
    revalidatePath("/friends");
    return true;
  } catch (error) {
    console.error("Error in Declining the request", error);
    return false;
  }
};

export const RemoveRequest = async (item) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Your session has expired");
  }

  const userId = session?.user?.id;
  await connectToDatabase();

  console.log(item);

  try {
    const user = await NewUser.findById(userId);
    const userItem = await NewUser.findById(item.friendId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Filter out the accepted friend request
    user.friendsRequestSend = user.friendsRequestSend.filter(
      (request) => !request.friendId.equals(item.friendId)
    );

    userItem.friendsRequests = userItem.friendsRequests.filter(
      (request) => !request.friendId.equals(userId)
    );
    await user.save();
    await userItem.save();
    revalidatePath("/friends");
    return true;
  } catch (error) {
    console.error("Error in Declining the request", error);
    return false;
  }
};
