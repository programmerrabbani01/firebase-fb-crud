"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import myImage from "@/public/my.jpg";
import { IconX } from "@tabler/icons-react";
import photoVideo from "@/public/photoVideo.png";
import tag from "@/public/tag.png";
import check from "@/public/check.png";
import live from "@/public/live.png";
import Swal from "sweetalert2";
import { updateAPost } from "@/firebase/models.ts";
import {
  deleteFileFromStorage,
  uploadFileToStorage,
} from "@/firebase/fileData.js";
import { serverTimestamp } from "firebase/firestore";

// Define the Post type
interface Post {
  id: string;
  content: string;
  photo?: string; // Photo is optional
  updatedAt?: any;
}

// Define the type for the post and toggleModal props
interface EditPostProps {
  toggleEditModal: () => void;
  post: Post | null; // Post object passed from parent
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export default function EditPost({
  toggleEditModal,
  post,
  setPosts,
}: EditPostProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toggleEditModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleEditModal]);

  // States for managing content and file
  const [input, setInput] = useState({
    content: post?.content || "", // Initialize with existing content
  });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(
    post?.photo || null // Initialize with existing photo
  );

  // Input value changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // For photo upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

  // Cancel selected file
  const cancelFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  // Handle saving the updated post

  const handleUpdatePost = async () => {
    try {
      let newFileUrl = post?.photo || null; // Start with existing photo

      // If a new file is uploaded, handle the file upload
      if (file) {
        // If there was a previous photo, delete it
        if (post?.photo) {
          await deleteFileFromStorage(post.photo); // Delete the old file from Firebase Storage
        }

        // Upload the new file
        newFileUrl = await uploadFileToStorage(file); // Upload the new file and get the URL
      }

      // Prepare updated data
      const updatedData: Post = {
        id: post?.id as string, // Ensure the id is always a string
        content: input.content,
        photo: newFileUrl ?? undefined, // Ensure that photo is either a string or undefined
        updatedAt: serverTimestamp(),
      };

      // Update the post in Firestore
      await updateAPost("posts", post?.id, updatedData);

      // Update the UI with new post content
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === post?.id ? { ...p, ...updatedData } : p))
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "The post has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      toggleEditModal(); // Close the modal after saving
    } catch (error) {
      console.error("Error updating post:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while updating the post.",
      });
    }
  };

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
              onClick={toggleEditModal}
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
                name="content"
                value={input.content}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* File preview */}
            {filePreview && (
              <div className="mt-4">
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={cancelFile}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Cancel file
                </button>
              </div>
            )}

            {/* Add to your post section */}
            <div className="mt-4 border rounded-lg p-2">
              <p className="text-gray-600 text-sm mb-2">Add to your post</p>
              <div className="flex justify-around">
                <div>
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-gray-600"
                    onClick={handleButtonClick}
                  >
                    <Image
                      src={photoVideo}
                      alt="photoVideo"
                      width={24}
                      height={24}
                    />
                    <span>Photo/Video</span>
                  </button>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
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
              <button
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                onClick={handleUpdatePost}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
