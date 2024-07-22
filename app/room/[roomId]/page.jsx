"use client";
import TagList from "@/components/tag-list";
import { Github } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import VideoCall from "./VideoPlayer";
import { splitTags } from "@/lib/utils";
import { OnAir } from "./action";

const Page = (props) => {
  const [room, setRoom] = useState(null); // Initialize room state with null
  const [loading, setLoading] = useState(true);
  const { roomId } = props.params;

  useEffect(() => {
    let mounted = true; // Flag to track component mounted status

    const fetchRoom = async () => {
      if (!roomId) return; // Wait until roomId is available
      try {
        const response = await fetch(`/api/room/${roomId}`);
        if (response.ok) {
          const data = await response.json();
          if (mounted) {
            // Check if component is still mounted before updating state
            setRoom(data);
            setLoading(false);
          }
        } else {
          console.error("Failed to fetch room");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching room:", error);
        setLoading(false);
      }
    };

    fetchRoom();

    // Call OnAir with true when the component mounts
    const onAirTrue = async () => {
      try {
        console.log("call for change");
        await OnAir(roomId, true);
      } catch (error) {
        console.error("Failed to call OnAir with true:", error);
      }
    };
    onAirTrue();

    return () => {
      mounted = false; // Cleanup function to set mounted to false on unmount

      // Call OnAir with false when the component unmounts
      const onAirFalse = async () => {
        try {
          console.log("call for change");
          await OnAir(roomId, false);
        } catch (error) {
          console.error("Failed to call OnAir with false:", error);
        }
      };
      onAirFalse();
    };
  }, [roomId]);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      event.preventDefault();
      event.returnValue = ""; // This line is necessary for the beforeunload event to trigger
      try {
        console.log("call for change on page close");
        await OnAir(roomId, false);
      } catch (error) {
        console.error("Failed to call OnAir with false on page close:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [roomId]);

  // Render the Page component
  return (
    room && ( // Ensure room is not null before rendering
      <div className="grid grid-cols-4 min-h-screen">
        <div className="col-span-3 border-spacing-1 border mt-2 p-4">
          <VideoCall roomInfo={roomId} />
        </div>
        <div className="col-span-1 p-4 pl-2">
          <div className="rounded-lg bg-card p-4 flex flex-col gap-4">
            {!loading && ( // Ensure room is loaded before accessing its properties
              <>
                <h1 className="text-base">{room.name}</h1>
                <p className="flex gap-2 flex-wrap">
                  <Github />
                  <Link
                    href={room.githubrepo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {room.githubrepo}
                  </Link>
                </p>
                <p className="text-base text-gray-600">{room.description}</p>
                <TagList tags={splitTags(room.language)} />
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Page;
