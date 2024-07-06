import NewRoom from "@/database/model/room2";
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize socket.io server instance
let io;

export default async function POST(req, res) {
  if (!io) {
    // Create socket.io server only once
    const server = req.socket.server;
    io = new Server(server);
  }

  const { roomId, isLive } = req.body;
  console.log(roomId);

  try {
    const room = await NewRoom.findById(roomId);
    console.log(room);
    if (room) {
      room.isLive = isLive;
      await room.save();

      // Emit live status change to all clients in the room
      io.to(roomId).emit("liveStatusChanged", isLive);

      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: "Room not found" });
    }
  } catch (error) {
    console.error("Error updating live status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
