import { ProfileForm } from "./create-room-form.jsx";

export default function CreateRoomPage() {
  return (
    <div className="container mx-auto flex flex-col gap-8 w-full px-[100px] py-10">
      <h1 className="p-2 pt-4 text-4xl font-bold">Create Room </h1>
      <div>
        <ProfileForm />
      </div>
    </div>
  );
}
