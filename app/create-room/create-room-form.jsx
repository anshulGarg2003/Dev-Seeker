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
import { useRouter } from "next/navigation";
import { CreateRoomAction } from "./actions";
import { useCallContext } from "@/context/CallContext";

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  language: z.string().min(2, {
    message: "Please enter a language for better matching.",
  }),
  githubrepo: z.string().min(2, {
    message: "Please enter a GitHub repository.",
  }),
});

export function ProfileForm() {
  const router = useRouter();
  const { setHeaderRefresh } = useCallContext();
  // Initialize useForm with zodResolver and defaultValues
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      language: "",
      githubrepo: "",
    },
  });

  // Define a submit handler
  async function onSubmit(values) {
    await CreateRoomAction(values); // Placeholder for actual form submission action
    setHeaderRefresh((prev) => !prev);
    router.push("/browse"); // Redirect after form submission
  }

  // Render the ProfileForm component
  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10 px-2"
        >
          {/* Username field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room name</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={25} />
                </FormControl>
                <FormDescription>
                  This is the Room name publicly display.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Describe your problem and projects you are working on.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Language field */}
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  List the languages and libraries you are using in your
                  projects.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* GitHub repository field */}
          <FormField
            control={form.control}
            name="githubrepo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GithubRepo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your GitHub repository.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
