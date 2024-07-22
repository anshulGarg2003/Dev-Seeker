"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import FeedbackCarousel from "@/components/FeedbackCarousel";

export default function Example() {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await fetch("/api/testimonals", { signal });
        if (response.ok) {
          const data = await response.json();
          setFeedback(data);
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
  return (
    <div className="">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-12 ">
          <div className="flex justify-center items-center">
            <Image src={"/icon.png"} width="200" height="200" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Community that help you to build
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              Engage with skilled developer who can assist in solving your
              problems efficiently and effectively, ensuring courteous and
              professional service.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={"/browse"}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="/about"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-indigo-500"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>

      {/* <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div> */}

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl">Our Testimonals</h1>
        {loading ? (
          <div className="py-10 flex justify-center items-center text-2xl">
            Please Wait while we are Loading...
          </div>
        ) : (
          <FeedbackCarousel feedbackData={feedback} />
        )}
      </div>
    </div>
  );
}
