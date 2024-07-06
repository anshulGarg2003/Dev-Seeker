"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loading from "@/Loading.json";
import { EditProfile } from "./edit-profile-form";
import Lottie from "lottie-react";

const page = () => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(session);
  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setUserInfo(data);
            console.log(data);
          }
        } else {
          setError("Failed to fetch user details");
        }
      } catch (error) {
        setError("Error fetching user details");
      } finally {
        if (isMounted) {
          // Update loading state only if component is still mounted
          setLoading(false);
        }
      }
    };

    fetchUserDetails();

    // Cleanup function to handle unmounting
    return () => {
      isMounted = false; // Set flag to false when component unmounts
    };
  }, [userId]);

  if (loading)
    return (
      <div className="absolue top-0">
        <Lottie animationData={Loading} />
      </div>
    );
  if (error) return <div>{error}</div>;
  return (
    <div>
      <EditProfile profileInfo={userInfo} />
    </div>
  );
};

export default page;
