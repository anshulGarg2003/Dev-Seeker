import Header from "@/components/Header";
import { ModeToggle } from "@/components/toggleButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Namaste...
      <ModeToggle />
      <Header />
    </main>
  );
}
