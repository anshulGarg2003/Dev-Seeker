"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCallContext } from "@/context/CallContext";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Lottie from "lottie-react";
import Thankyou from "@/Thankyou.json";
import { sendFeedback } from "./actions";
import StarRating from "./StarRating";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const { roomInfo, callSession, roomCreator } = useCallContext();
  const session = useSession();
  const [feedback, setFeedback] = useState("");
  const [star, setStar] = useState(0);
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const handleSelection = (e) => {
    setSelected(e.target.value);
    if (selected == "yes") {
      toast.promise(sendComplete(roomInfo), {
        loading: "Saving...",
        success: <b>Thank you for sharing</b>,
        error: <b>Could not save.</b>,
      });
    }
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSendMessage = async () => {
    // console.log(feedback);
    if (star != 0 && feedback == "") {
      toast.error("Please give your valuabe feedback");
      return;
    }
    toast.promise(sendFeedback(feedback, star), {
      loading: "Saving...",
      success: <b>Thank you for sharing</b>,
      error: <b>Could not save.</b>,
    });
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <Lottie animationData={Thankyou} className="h-[40%] w-[40%]" />
      <div className="container mx-auto flex flex-col gap-8 w-full px-[100px] py-10">
        {roomCreator === session.data?.user?.id ? (
          <div className="flex items-center gap-2 justify-around">
            <p className="text-gray-500 text-3xl">Is Your Room Solved?</p>
            <div className="flex gap-1 ">
              <input
                type="radio"
                id="yes"
                name="roomSolved"
                value="yes"
                checked={selected === "yes"}
                onChange={handleSelection}
                className="w-[1.5rem] h-[1.5rem] mr-2"
              />
              <label
                htmlFor="yes"
                className={`   ${
                  selected === "yes" ? "text-white" : "text-gray-700"
                }  `}
              >
                Yes
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="no"
                name="roomSolved"
                value="no"
                checked={selected === "no"}
                onChange={handleSelection}
                className="w-[1.5rem] h-[1.5rem] mr-2"
              />
              <label
                htmlFor="no"
                className={`   ${
                  selected === "no" ? "text-white" : "text-gray-700"
                }  `}
              >
                No
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-2xl">
            <p>Every Effort Counts...Thanks For Your Contribution...</p>
            <p>
              You have contributed for about {callSession?.toFixed(2)} minutes
            </p>
            <p>
              According to your time and efforts we have credited Seeker Coins
              to your purse...
            </p>
          </div>
        )}
        <div className="gap-2.5">
          <StarRating changeRating={setStar} />
          <div className="grid w-full gap-2">
            <Label htmlFor="message-2" className="text-3xl text-gray-500">
              Your Feedback
            </Label>
            <Textarea
              placeholder="Type your message here."
              value={feedback}
              onChange={handleFeedbackChange}
              row={10}
            />
            <p className="text-sm text-muted-foreground">
              Your message will be copied to the support team.
            </p>
          </div>
          <Button className="mt-2" onClick={handleSendMessage}>
            Send message
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Page;
