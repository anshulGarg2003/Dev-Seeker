"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { UpdateUser } from "./actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Please enter a GitHub repository.",
  }),
  github: z.string().min(2, {
    message: "Please enter a GitHub repository.",
  }),
  bio: z.string().min(2, {
    message:
      "Please describe yourself. It will recommneded for make more friends",
  }),
  tags: z.string().min(2, {
    message:
      "Please write down your favourate topics and libraries for better room suggestions",
  }),
  country: z.string().min(2, {
    message: "Enter your country",
  }),
  role: z.string().min(2, {
    message: "Please select either of one",
  }),
  institute: z.string().min(2, {
    message: "Please enter your organization",
  }),
});

export function EditProfile({ profileInfo }) {
  console.log(profileInfo);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profileInfo?.name,
      email: profileInfo?.email,
      github: profileInfo?.github,
      bio: profileInfo?.bio,
      tags: profileInfo?.tags,
      country: profileInfo?.country,
      role: profileInfo?.role,
      institute: profileInfo?.institute,
    },
  });

  const session = useSession();

  // Define a submit handler
  async function onSubmit(values) {
    // console.log(values);
    await UpdateUser(values);

    toast.success("Details Update Successfully ");
    redirect(`/user/${session.data.user.userId}`);
  }

  // Render the ProfileForm component
  return (
    <div className="w-full px-[100px] py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10 px-2 flex flex-col"
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="w-[150px] h-[150px] rounded-[50%] border-[5px]">
              <Image
                src={profileInfo.image}
                alt="profileImage"
                width="150"
                height="150"
                className="rounded-[50%]"
              />
            </div>
            <p>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className="text-center" />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </p>
          </div>

          <div className="flex w-full justify-between gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-[500px]" />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-[500px]" />
                  </FormControl>
                  <FormDescription>Github Profile Address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Your Learning</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            className="w-full"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Bio</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="text-center" />
                </FormControl>
                <FormDescription>Enter your Country </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between w-full gap-4">
            <FormField
              control={form.control}
              name="role"
              className="w-full"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sutdent/Professional:</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-[500px]" />
                  </FormControl>
                  <FormDescription>Describe your role</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-[500px]" />
                  </FormControl>
                  <FormDescription>
                    Enter your university if a student or company if a
                    Professional
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
