"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/globe").then((m) => m.World), {
  ssr: false,
});

// const globeConfig = {
//   pointSize: 4,
//   globeColor: "#062056",
//   showAtmosphere: true,
//   atmosphereColor: "#FFFFFF",
//   atmosphereAltitude: 0.1,
//   emissive: "#062056",
//   emissiveIntensity: 0.1,
//   shininess: 0.9,
//   polygonColor: "rgba(255,255,255,0.7)",
//   ambientLight: "#38bdf8",
//   directionalLeftLight: "#ffffff",
//   directionalTopLight: "#ffffff",
//   pointLight: "#ffffff",
//   arcTime: 1000,
//   arcLength: 0.9,
//   rings: 1,
//   maxRings: 3,
//   initialPosition: { lat: 22.3193, lng: 114.1694 },
//   autoRotate: true,
//   autoRotateSpeed: 0.5,
// };
// const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
// const sampleArcs = [
//   {
//     order: 1,
//     startLat: -19.885592,
//     startLng: -43.951191,
//     endLat: -22.9068,
//     endLng: -43.1729,
//     arcAlt: 0.1,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 1,
//     startLat: 28.6139,
//     startLng: 77.209,
//     endLat: 3.139,
//     endLng: 101.6869,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 1,
//     startLat: -19.885592,
//     startLng: -43.951191,
//     endLat: -1.303396,
//     endLng: 36.852443,
//     arcAlt: 0.5,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 2,
//     startLat: 1.3521,
//     startLng: 103.8198,
//     endLat: 35.6762,
//     endLng: 139.6503,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 2,
//     startLat: 51.5072,
//     startLng: -0.1276,
//     endLat: 3.139,
//     endLng: 101.6869,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 2,
//     startLat: -15.785493,
//     startLng: -47.909029,
//     endLat: 36.162809,
//     endLng: -115.119411,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 3,
//     startLat: -33.8688,
//     startLng: 151.2093,
//     endLat: 22.3193,
//     endLng: 114.1694,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 3,
//     startLat: 21.3099,
//     startLng: -157.8581,
//     endLat: 40.7128,
//     endLng: -74.006,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 3,
//     startLat: -6.2088,
//     startLng: 106.8456,
//     endLat: 51.5072,
//     endLng: -0.1276,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 4,
//     startLat: 11.986597,
//     startLng: 8.571831,
//     endLat: -15.595412,
//     endLng: -56.05918,
//     arcAlt: 0.5,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 4,
//     startLat: -34.6037,
//     startLng: -58.3816,
//     endLat: 22.3193,
//     endLng: 114.1694,
//     arcAlt: 0.7,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 4,
//     startLat: 51.5072,
//     startLng: -0.1276,
//     endLat: 48.8566,
//     endLng: -2.3522,
//     arcAlt: 0.1,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 5,
//     startLat: 14.5995,
//     startLng: 120.9842,
//     endLat: 51.5072,
//     endLng: -0.1276,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 5,
//     startLat: 1.3521,
//     startLng: 103.8198,
//     endLat: -33.8688,
//     endLng: 151.2093,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 5,
//     startLat: 34.0522,
//     startLng: -118.2437,
//     endLat: 48.8566,
//     endLng: -2.3522,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 6,
//     startLat: -15.432563,
//     startLng: 28.315853,
//     endLat: 1.094136,
//     endLng: -63.34546,
//     arcAlt: 0.7,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 6,
//     startLat: 37.5665,
//     startLng: 126.978,
//     endLat: 35.6762,
//     endLng: 139.6503,
//     arcAlt: 0.1,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 6,
//     startLat: 22.3193,
//     startLng: 114.1694,
//     endLat: 51.5072,
//     endLng: -0.1276,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 7,
//     startLat: -19.885592,
//     startLng: -43.951191,
//     endLat: -15.595412,
//     endLng: -56.05918,
//     arcAlt: 0.1,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 7,
//     startLat: 48.8566,
//     startLng: -2.3522,
//     endLat: 52.52,
//     endLng: 13.405,
//     arcAlt: 0.1,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 7,
//     startLat: 52.52,
//     startLng: 13.405,
//     endLat: 34.0522,
//     endLng: -118.2437,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 8,
//     startLat: -8.833221,
//     startLng: 13.264837,
//     endLat: -33.936138,
//     endLng: 18.436529,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 8,
//     startLat: 49.2827,
//     startLng: -123.1207,
//     endLat: 52.3676,
//     endLng: 4.9041,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 8,
//     startLat: 1.3521,
//     startLng: 103.8198,
//     endLat: 40.7128,
//     endLng: -74.006,
//     arcAlt: 0.5,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 9,
//     startLat: 51.5072,
//     startLng: -0.1276,
//     endLat: 34.0522,
//     endLng: -118.2437,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 9,
//     startLat: 22.3193,
//     startLng: 114.1694,
//     endLat: -22.9068,
//     endLng: -43.1729,
//     arcAlt: 0.7,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 9,
//     startLat: 1.3521,
//     startLng: 103.8198,
//     endLat: -34.6037,
//     endLng: -58.3816,
//     arcAlt: 0.5,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 10,
//     startLat: -22.9068,
//     startLng: -43.1729,
//     endLat: 28.6139,
//     endLng: 77.209,
//     arcAlt: 0.7,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 10,
//     startLat: 34.0522,
//     startLng: -118.2437,
//     endLat: 31.2304,
//     endLng: 121.4737,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 10,
//     startLat: -6.2088,
//     startLng: 106.8456,
//     endLat: 52.3676,
//     endLng: 4.9041,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 11,
//     startLat: 41.9028,
//     startLng: 12.4964,
//     endLat: 34.0522,
//     endLng: -118.2437,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 11,
//     startLat: -6.2088,
//     startLng: 106.8456,
//     endLat: 31.2304,
//     endLng: 121.4737,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 11,
//     startLat: 22.3193,
//     startLng: 114.1694,
//     endLat: 1.3521,
//     endLng: 103.8198,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 12,
//     startLat: 34.0522,
//     startLng: -118.2437,
//     endLat: 37.7749,
//     endLng: -122.4194,
//     arcAlt: 0.1,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 12,
//     startLat: 35.6762,
//     startLng: 139.6503,
//     endLat: 22.3193,
//     endLng: 114.1694,
//     arcAlt: 0.2,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 12,
//     startLat: 22.3193,
//     startLng: 114.1694,
//     endLat: 34.0522,
//     endLng: -118.2437,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 13,
//     startLat: 52.52,
//     startLng: 13.405,
//     endLat: 22.3193,
//     endLng: 114.1694,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 13,
//     startLat: 11.986597,
//     startLng: 8.571831,
//     endLat: 35.6762,
//     endLng: 139.6503,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 13,
//     startLat: -22.9068,
//     startLng: -43.1729,
//     endLat: -34.6037,
//     endLng: -58.3816,
//     arcAlt: 0.1,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
//   {
//     order: 14,
//     startLat: -33.936138,
//     startLng: 18.436529,
//     endLat: 21.395643,
//     endLng: 39.883798,
//     arcAlt: 0.3,
//     color: colors[Math.floor(Math.random() * (colors.length - 1))],
//   },
// ];

export default function Example() {
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

      <div className=" py-10 flex justify-center items-center">
        <figure class="max-w-screen-md">
          <div class="flex justify-center items-center mb-4 text-yellow-300">
            <svg
              class="w-5 h-5 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-5 h-5 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-5 h-5 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-5 h-5 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
          <blockquote>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">
              "Flowbite is just awesome. It contains tons of predesigned
              components and pages starting from login screen to complex
              dashboard. Perfect choice for your next SaaS application."
            </p>
          </blockquote>
          <figcaption class="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
            <img
              class="w-6 h-6 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
              alt="profile picture"
            />
            <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
              <cite class="pe-3 font-medium text-gray-900 dark:text-white">
                Bonnie Green
              </cite>
              <cite class="ps-3 text-sm text-gray-500 dark:text-gray-400">
                CTO at Flowbite
              </cite>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
