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
import { animals } from "../user/edit/country";

const formSchema = z.object({
  name: z.string(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  language: z.string().min(2, {
    message: "Please enter a language for better matching.",
  }),
  githubrepo: z.string().min(2, {
    message: "Please enter a GitHub repository.",
  }),
  complete: z.enum(["true", "false"]).transform((val) => val === "true"),
});

export function FeedbackForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      language: "",
      githubrepo: "",
      complete: "true",
    },
  });

  async function onSubmit(values) {
    console.log("Hello");
    console.log(values);
  }

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
            name="complete"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is Your Room is Solve??</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="flex h-10 w-full bg-transparent rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option
                      value="true"
                      className="flex h-15 w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Yes
                    </option>
                    <option
                      value="false"
                      className="flex h-15 w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      No
                    </option>
                    <option
                      value="false"
                      className="flex h-15 w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Can't Say
                    </option>
                  </select>
                </FormControl>
                <FormDescription>
                  Select whether the task is complete or not.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room name</FormLabel>
                <FormControl>
                  <Input {...field} />
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

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="flex h-10 w-full bg-transparent rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option
                      value=""
                      disabled
                      className="flex h-10 w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Select a language
                    </option>
                    {animals.map((animal) => (
                      <option
                        key={animal.label}
                        value={animal.value}
                        className="flex h-10 w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {animal.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormDescription>
                  List the languages and libraries you are using in your
                  projects.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// // import { UpdateUser } from "./actions";
// import toast from "react-hot-toast";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import React from "react";
// import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
// import { animals } from "../user/edit/country";
// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   email: z.string().min(2, {
//     message: "Please enter a GitHub repository.",
//   }),
//   github: z.string().min(2, {
//     message: "Please enter a GitHub repository.",
//   }),
//   bio: z.string().min(2, {
//     message:
//       "Please describe yourself. It will recommneded for make more friends",
//   }),
//   tags: z.string().min(2, {
//     message:
//       "Please write down your favourate topics and libraries for better room suggestions",
//   }),
//   country: z.string().min(2, {
//     message: "Enter your country",
//   }),
//   role: z.string().min(2, {
//     message: "Please select either of one",
//   }),
//   institute: z.string().min(2, {
//     message: "Please enter your organization",
//   }),
// });
// export function EditProfile({ profileInfo }) {
//   // console.log(profileInfo);
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: profileInfo?.name,
//       email: profileInfo?.email,
//       github: profileInfo?.github,
//       bio: profileInfo?.bio,
//       tags: profileInfo?.tags,
//       country: profileInfo?.country,
//       role: profileInfo?.role,
//       institute: profileInfo?.institute,
//     },
//   });
//   const session = useSession();
//   async function onSubmit(values) {
//     console.log(values);
//     // await UpdateUser(values);

//     // toast.success("Details Update Successfully ");
//     // redirect(`/user/${session.data.user.userId}`);
//   }
//   return (
//     <div className="w-full px-[100px] py-10">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-8 pb-10 px-2 flex flex-col"
//         >
//           <div className="flex flex-col gap-4 justify-center items-center">
//             <div className="w-[150px] h-[150px] rounded-[50%] border-[5px]">
//               <Image
//                 src={profileInfo?.image}
//                 alt="profileImage"
//                 width="150"
//                 height="150"
//                 className="rounded-[50%]"
//               />
//             </div>
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input {...field} className="text-center" />
//                   </FormControl>
//                   <FormDescription>
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="flex w-full justify-between">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>E-mail</FormLabel>
//                   <FormControl>
//                     <Input {...field} className="w-[575px]" />
//                   </FormControl>
//                   <FormDescription>
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="github"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Github</FormLabel>
//                   <FormControl>
//                     <Input {...field} className="w-[575px]" />
//                   </FormControl>
//                   <FormDescription>Github Profile Address</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control}
//             name="tags"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Tags</FormLabel>
//                 <FormControl>
//                   <Input {...field} />
//                 </FormControl>
//                 <FormDescription>Your Learning</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="bio"
//             className="w-full"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Your Bio</FormLabel>
//                 <FormControl>
//                   <Input {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   This is your public display name.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormItem>
//             <FormLabel>Country</FormLabel>
//             <FormControl>
//               <Autocomplete
//                 className="flex h-10 w-full bg-transparent rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                 defaultItems={animals}
//                 aria-label="Country"
//                 placeholder="Search an animal"
//                 // Inline onSelect handler
//               >
//                 {(animal) => (
//                   <AutocompleteItem
//                     className="flex h-10 w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                     onSelect={(animal) =>
//                       form.setValue("country", animal.label)
//                     }
//                     key={animal.value}
//                   >
//                     {animal.label}
//                   </AutocompleteItem>
//                 )}
//               </Autocomplete>
//             </FormControl>
//             <FormDescription>Enter your Country </FormDescription>
//             <FormMessage />
//           </FormItem>

//           <div className="flex justify-around w-full">
//             <FormField
//               control={form.control}
//               name="role"
//               className="w-full"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Sutdent/Professional:</FormLabel>
//                   <FormControl>
//                     <Input {...field} className="w-[575px]" />
//                   </FormControl>
//                   <FormDescription>Describe your role</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="institute"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Institute</FormLabel>
//                   <FormControl>
//                     <Input {...field} className="w-[575px]" />
//                   </FormControl>
//                   <FormDescription>
//                     Enter your university if a student or company if a
//                     Professional
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Button type="submit">Submit</Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
