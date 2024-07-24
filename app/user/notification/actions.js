"use server";

import NewUser from "@/database/model/user2";
import connectToDatabase from "@/database/mongoose";
import { getSession } from "@/lib/auth";

export const fetchUserNotifications = async () => {
  const session = await getSession();

  if (!session) return false;

  await connectToDatabase();

  const user = await NewUser.findById(session.user.id);

  if (!user) return false;

  const notices = JSON.parse(JSON.stringify(user.notification));

  return notices;
};

export const RemoveNotification = async (item) => {
  const session = await getSession();

  if (!session) return false;

  await connectToDatabase();

  const user = await NewUser.findById(session.user.id);

  if (!user) return false;

  user.notification = user.notification.filter(
    (request) => !request._id.equals(item._id)
  );

  // console.log(user);
  await user.save();

  return true;
};
