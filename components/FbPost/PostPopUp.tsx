"use client";

import Image from "next/image.js";
import React, { useEffect, useRef } from "react";
import myImage from "@/public/my.jpg";
import { IconX } from "@tabler/icons-react";
import photoVideo from "@/public/photoVideo.png";
import tag from "@/public/tag.png";
import check from "@/public/check.png";
import live from "@/public/live.png";

// Define the type for the toggleModal prop
interface PostPopUpProps {
  toggleModal: () => void;
}

export default function PostPopUp({ toggleModal }: PostPopUpProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toggleModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleModal]);

  return (
    <>
      <div className="relative">
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white w-full max-w-lg p-4 rounded-lg shadow-lg relative"
          >
            {/* Close button */}
            <div
              className="absolute cursor-pointer  top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={toggleModal}
            >
              <IconX
                stroke={2}
                className="w-8 h-8 p-2 bg-[#E4E6E9] rounded-full"
              />
            </div>

            {/* Header: Profile & Friends visibility */}
            <div className="flex items-center space-x-2">
              <Image
                src={myImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">Programmer Rabbani</p>
                <button className="flex items-center space-x-1 text-sm text-gray-500">
                  <span>Friends</span> {/* Add an icon if needed */}
                </button>
              </div>
            </div>

            {/* Post input */}
            <div className="mt-4">
              <textarea
                className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none"
                rows={4}
                placeholder="What's on your mind, Programmer?"
              ></textarea>
            </div>

            {/* Add to your post section */}
            <div className="mt-4 border rounded-lg p-2">
              <p className="text-gray-600 text-sm mb-2">Add to your post</p>
              <div className="flex justify-around">
                <button className="flex items-center space-x-2 text-gray-600">
                  <Image
                    src={photoVideo}
                    alt="photoVideo"
                    width={24}
                    height={24}
                  />
                  <span>Photo/Video</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600">
                  <Image src={tag} alt="tag" width={24} height={24} />
                  <span>Tag Friends</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600">
                  <Image src={check} alt="check" width={24} height={24} />
                  <span>Check In</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600">
                  <Image src={live} alt="live" width={24} height={24} />
                  <span>Live Video</span>
                </button>
              </div>
            </div>

            {/* Post button */}
            <div className="mt-4">
              <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
