"use client";
import React, { useState } from "react";
import { EditProfile, FeedbackForm } from "./feedback-form";

const page = () => {
  return (
    <main className="container">
      <div className="container mx-auto flex flex-col gap-8 w-full px-[100px] py-10">
        <h1 className="p-2 pt-4 text-4xl font-bold">Feedback Form </h1>
        <div>
          {/* <EditProfile /> */}
          <FeedbackForm />
        </div>
      </div>
    </main>
  );
};

export default page;
