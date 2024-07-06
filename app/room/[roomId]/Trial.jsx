"use client";
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  CallParticipantsList,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateTokenAction } from "./action";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import Live from "@/Live.json";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY;

export default function Trial({ roomInfo }) {
  const session = useSession();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  // const [isPageVisible, setIsPageVisible] = useState(true);
  const { useLocalParticipant, useParticipantCount, useParticipants } =
    useCallStateHooks();
  const participantCount = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const participants = useParticipants();
  const router = useRouter();

  useEffect(() => {
    // if (!roomInfo || !session?.data?.user) return;

    const userId = session?.data?.user?.id;
    console.log("Initializing StreamVideoClient with API Key:", apiKey);

    // Initialize client and call only when necessary
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId || "anshuldeveloper",
        name: session?.data?.user?.name || "Anshul Garg",
      },
      tokenProvider: () => generateTokenAction(),
    });

    setClient(client);

    // Join the call and handle lifecycle events
    const call = client.call("default", roomInfo || "trialroom234");
    call
      .join({ create: true })
      .then(() => {
        console.log("Joined the call successfully.");
      })
      .catch((error) => {
        console.error("Failed to join the call:", error);
      });
    setCall(call);

    // Clean up resources on component unmount
    return () => {
      if (call) {
        call
          .leave()
          .then(() => client.disconnectUser())
          .catch(console.error);
      }
    };
  }, [session, roomInfo]);

  return (
    client &&
    call && (
      <StreamVideo client={client} className="absolute">
        <div className="top-1 left-1 w-[50px]">
          <Lottie animationData={Live} />
        </div>
        <StreamCall call={call}>
          <StreamTheme>
            <div>
              <SpeakerLayout />
              <CallControls
                onLeave={async () => {
                  console.log("call for change");
                  await OnAir(roomId, false);
                  router.push("/browse");
                }}
              />
              <CallParticipantsList onClose={() => undefined} />
              <div>
                <div>Number of participants: {participantCount}</div>
                <div>Number of total participants: {participants}</div>
                <div>Session ID: {localParticipant?.sessionId}</div>
              </div>
            </div>
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    )
  );
}

// "use client";
// import {
//   CallControls,
//   SpeakerLayout,
//   StreamCall,
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
//   CallParticipantsList,
// } from "@stream-io/video-react-sdk";

// import "@stream-io/video-react-sdk/dist/css/styles.css";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { OnAir, generateTokenAction } from "./action";
// import { useRouter } from "next/navigation";
// import Lottie from "lottie-react";
// import Live from "@/Live.json";

// const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY;

// export default function VideoCall({ roomInfo }) {
//   const session = useSession();
//   const [client, setClient] = useState(null);
//   const [call, setCall] = useState(null);
//   const [isPageVisible, setIsPageVisible] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     if (!roomInfo || !session?.data?.user) return;

//     const userId = session.data.user.id;
//     console.log("Initializing StreamVideoClient with API Key:", apiKey);

//     // Initialize client and call only when necessary
//     const client = new StreamVideoClient({
//       apiKey,
//       user: {
//         id: userId,
//         name: session.data.user.name,
//       },
//       tokenProvider: () => generateTokenAction(),
//     });

//     setClient(client);

//     // Join the call and handle lifecycle events
//     const call = client.call("default", roomInfo);
//     call
//       .join({ create: true })
//       .then(() => {
//         console.log("Joined the call successfully.");
//       })
//       .catch((error) => {
//         console.error("Failed to join the call:", error);
//       });
//     setCall(call);

//     // Clean up resources on component unmount
//     return () => {
//       if (call) {
//         call
//           .leave()
//           .then(() => client.disconnectUser())
//           .catch(console.error);
//       }
//     };
//   }, [session, roomInfo]);

//   useEffect(() => {
//     const handleVisibilityChange = async () => {
//       const newVisibility = !document.hidden;
//       setIsPageVisible(newVisibility);
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     // Initial call to OnAir when the component mounts
//     handleVisibilityChange();

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, [roomInfo]);

//   // Render the Stream components when client and call are ready
//   return (
//     client &&
//     call && (
//       <StreamVideo client={client} className="absolute">
//         <div className="top-1 left-1 w-[50px]">
//           <Lottie animationData={Live} />
//         </div>
//         <StreamCall call={call}>
//           <StreamTheme>
//             <div>
//               <SpeakerLayout />
//               <CallControls
//                 onLeave={() => {
//                   router.push("/browse");
//                 }}
//               />
//               <CallParticipantsList onClose={() => undefined} />
//               <div className="live-signal">
//                 {isPageVisible ? (
//                   <span style={{ color: "green" }}>Live</span>
//                 ) : (
//                   <span style={{ color: "red" }}>Not Live</span>
//                 )}
//               </div>
//             </div>
//           </StreamTheme>
//         </StreamCall>
//       </StreamVideo>
//     )
//   );
// }
