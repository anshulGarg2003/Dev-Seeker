"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { RoomCard } from "@/components/RoomCard";
import CreateRoomButton from "@/components/Create-Form-Button";
import Lottie from "lottie-react";
import Loading from "@/Loading.json";
import Image from "next/image";

export default function Home({ searchParams }) {
  // console.log(searchParams.search);
  const { data: session } = useSession();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredRooms, setFilteredRooms] = useState([]);
  // let [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await fetch("/api/room", { signal });
        if (response.ok) {
          const data = await response.json();
          setRooms(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch rooms");
          setLoading(false);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching rooms:", error);
          setLoading(false);
        }
      }

      return () => {
        controller.abort();
      };
    };

    fetchRooms();
  }, [loading]);

  useEffect(() => {
    const filterRoomsByLanguage = (rooms, language) => {
      return rooms.filter((room) => {
        if (!room.language) {
          return false;
        }
        const languages = room.language
          .split(",")
          .map((lang) => lang.trim().toLowerCase());
        return languages.includes(language);
      });
    };

    if (searchParams?.search) {
      const filtered = filterRoomsByLanguage(
        rooms,
        searchParams?.search.toLowerCase()
      );
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }
  }, [searchParams, rooms]);

  return (
    <main className="min-h-screen p-14">
      {loading ? (
        <div className="flex justify-center items-center">
          <Lottie loop={true} animationData={Loading} />
        </div>
      ) : (
        <>
          <CreateRoomButton />
          <div className="py-5 flex items-center justify-center">
            <SearchBar />
          </div>
          <div className="flex  flex-col mt-8 gap-2">
            {filteredRooms.length === 0 ? (
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={"/done.svg"}
                  alt="all rooms are completed"
                  width="500"
                  height="500"
                  className="flex items-center justify-center"
                />
                <p>All rooms are completed</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filteredRooms.map((room, idx) => (
                  <RoomCard key={room._id} roomInfo={room} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
