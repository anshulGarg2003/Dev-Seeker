import React, { useState } from "react";

const StarRating = ({ changeRating }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (n) => {
    setRating(n);
    changeRating(n);
  };

  const starClasses = () => {
    if (rating == 1) {
      return "text-red-500";
    } else if (rating == 2) {
      return "text-orange-500";
    } else if (rating == 3) {
      return "text-yellow-300";
    } else if (rating == 4) {
      return "text-yellow-400";
    } else if (rating == 5) {
      return "text-green-500";
    } else {
      return "";
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Please rate our service
      </h1>
      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            onClick={() => handleRating(num)}
            className={`text-6xl cursor-pointer ${
              num <= rating ? starClasses() : ""
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
