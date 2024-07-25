import Link from "next/link";
import React, { useEffect, useState } from "react";

const FeedbackCarousel = ({ feedbackData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState("animate-fadeIn");

  useEffect(() => {
    const interval = setInterval(() => {
      setFade("animate-fadeOut");
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
        setFade("animate-fadeIn");
      }, 1000); // Match this to the duration of the fadeOut animation
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [feedbackData.length]);

  const item = feedbackData[currentIndex];

  return (
    <div className="py-10 flex justify-center items-center min-h-[250px]">
      <div className="max-w-screen-md w-[500px] text-center">
        <div className={`transition-opacity duration-1000 ease-in-out ${fade}`}>
          <div className="flex justify-center items-center mb-4 text-yellow-300">
            {Array.from({ length: item?.star }).map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <blockquote>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {item?.feedback}
            </p>
          </blockquote>
          <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
            <Link href={`/user/${item?.userId}`}>
              <img
                className="w-6 h-6 rounded-full"
                src={item?.userProfile}
                alt="profile picture"
              />
            </Link>
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
              <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                Developer {item?.userName}
              </cite>
              <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                Proud Contributor
              </cite>
            </div>
          </figcaption>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCarousel;
