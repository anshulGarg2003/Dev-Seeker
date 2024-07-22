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
import { AddCoin, OnAir, generateTokenAction } from "./action";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import Live from "@/Live.json";
import Waiting from "@/Waiting.json";
import { useCallContext } from "@/context/CallContext";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY;

export default function VideoCall({ roomInfo }) {
  const session = useSession();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [participantCount, setParticipantCount] = useState(0);
  const [callData, setCallData] = useState({});
  const [callStatus, setCallStatus] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const { setRoomCreator, setCallSession, setRoomInfo } = useCallContext();
  const router = useRouter();

  useEffect(() => {
    if (!roomInfo || !session?.data?.user) return;

    const userId = session.data.user.id;
    console.log("Initializing StreamVideoClient with API Key:", apiKey);

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.data.user.name,
      },
      tokenProvider: () => generateTokenAction(),
    });

    setClient(client);

    const call = client.call("default", roomInfo);
    call
      .join({ create: true })
      .then(() => {
        console.log("Joined the call successfully.");
      })
      .catch((error) => {
        console.error("Failed to join the call:", error);
      });
    setCall(call);

    return () => {
      if (call) {
        call
          .leave()
          .then(() => client.disconnectUser())
          .catch(console.error);
      }
    };
  }, [session, roomInfo]);

  console.log(callStatus, "callState");

  useEffect(() => {
    setTotalCount(participantCount);
  }, [participantCount]);

  return (
    client &&
    call && (
      <StreamVideo client={client} className="absolute">
        <div className="top-1 left-1 w-[50px]">
          <Lottie animationData={Live} />
        </div>
        <StreamCall call={call}>
          <StreamTheme>
            <MyVideoUI
              setParticipantCount={setParticipantCount}
              setCallData={setCallData}
              setCallStatus={setCallStatus}
            />
            {totalCount > 1 ? (
              <>
                <SpeakerLayout />
                <CallControls
                  onLeave={async () => {
                    const { CreatorId, totalMin } = await AddCoin(
                      roomInfo,
                      callData
                    );
                    setRoomCreator(CreatorId);
                    setCallSession(totalMin);
                    setRoomInfo(roomInfo);
                    router.push("/feedback");
                  }}
                />
                <CallParticipantsList onClose={() => undefined} />
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center items-center ">
                  <p className="text-3xl text-neutral-600 font-semibold">
                    Waiting for someone to join...
                  </p>
                  <Lottie animationData={Waiting} />
                </div>
              </>
            )}
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    )
  );
}

const MyVideoUI = ({ setParticipantCount, setCallData, setCallStatus }) => {
  const { useParticipantCount, useLocalParticipant, useCallState } =
    useCallStateHooks();

  const callSession = useLocalParticipant();
  const participantCount = useParticipantCount();
  const callstate = useCallState();

  useEffect(() => {
    setParticipantCount(participantCount);
    setCallData(callSession);
    setCallStatus(callstate);
  }, [participantCount, callSession, callstate]);

  return (
    <>
      <div>
        <div>Number of participants: {participantCount}</div>
      </div>
    </>
  );
};
