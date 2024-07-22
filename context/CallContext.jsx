import { createContext, useState, useContext } from "react";

const CallContext = createContext();

export const useCallContext = () => useContext(CallContext);

export const CallProvider = ({ children }) => {
  const [roomInfo, setRoomInfo] = useState(null);
  const [callSession, setCallSession] = useState(null);
  const [roomCreator, setRoomCreator] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  return (
    <CallContext.Provider
      value={{
        roomInfo,
        setRoomInfo,
        callSession,
        setCallSession,
        roomCreator,
        setRoomCreator,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};
