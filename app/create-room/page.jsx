import { ProfileForm } from "./create-room-form";

export default function CreateRoomPage() {
  return (
    <div className="container mx-auto flex flex-col gap-8">
      <h1 className="text-4xl font-bold">Create Room </h1>
      <div>
        <ProfileForm />
      </div>
    </div>
  );
}
