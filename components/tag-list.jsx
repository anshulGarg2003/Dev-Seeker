"use client";
import { useRouter } from "next/navigation";
import { badgeVariants } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function TagList({ tags }) {
  const router = useRouter();
  return (
    <div className="w-fit flex flex-wrap gap-2">
      {tags.map((lang) => (
        <Button
          className={cn(badgeVariants())}
          onClick={() => {
            router.push(`/browse/?search=${lang.toLowerCase()}`);
          }}
          key={lang}
        >
          {lang}
        </Button>
      ))}
    </div>
  );
}
