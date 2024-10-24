"use client";

import Image from "next/image";
import React, { useState } from "react";
import myImage from "@/public/my.jpg";
import live from "@/public/live.png";
import photoVideo from "@/public/photoVideo.png";
import reel from "@/public/reel.png";
import PostPopUp from "./PostPopUp";

export default function PostWrite() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggles the modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-8 mb-4">
        <div className="overflow-x-hidden overflow-y-hidden w-full bg-white shadow-md rounded-lg">
          <div className="pt-3 pr-4 pb-[10px] pl-4">
            {/* top item */}
            <div className="flex items-center space-x-3 p-2">
              {/* image */}
              <Image
                src={myImage}
                alt="Profile"
                className="w-10 h-10 object-cover rounded-full"
              />
              {/* write post */}
              <div
                className="bg-[#E4E6E9] rounded-full px-4 py-2 w-full focus:outline-none cursor-pointer"
                onClick={toggleModal}
              >
                <span className="text-[rgb(101,103,107)]">
                  What's on your mind, Programmer?
                </span>
              </div>
            </div>
            {/* bottom item */}
            <div className="mt-1">
              {/* border */}
              <div className="border border-gray-200"></div>
              {/* content */}
              <div className="pt-2 w-full h-10 flex items-center justify-around">
                <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
                  <Image src={live} alt="live" width={24} height={24} />
                  <span>Live video</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
                  <Image
                    src={photoVideo}
                    alt="photoVideo"
                    width={24}
                    height={24}
                  />
                  <span>Photo/video</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
                  <Image src={reel} alt="reel" width={24} height={24} />
                  <span>Reel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isOpen && <PostPopUp toggleModal={toggleModal} />}
    </>
  );
}
