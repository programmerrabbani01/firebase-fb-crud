"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import myImage from "@/public/my.jpg";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons-react";
import { getAllPostsRealTime, getDeleteAPost } from "@/firebase/models.js";

// Define the shape of a post
interface Post {
  id: string;
  content: string;
  photo?: string;
}

export default function PostContent() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleEditPost = () => {
    console.log("Edit Post clicked");
  };

  const handleMoveToTrash = async (id: string) => {
    try {
      await getDeleteAPost("posts", id); // Call the delete function
      setPosts(posts.filter((post) => post.id !== id)); // Remove from UI
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // states

  const [posts, setPosts] = useState<Post[]>([]);

  //   get all posts data

  const getAllPostsData = async () => {
    await getAllPostsRealTime("posts", setPosts);
  };

  useEffect(() => {
    getAllPostsData();
  }, []);

  return (
    <>
      {posts?.length > 0 ? (
        posts.map((post) => {
          return (
            <div
              key={post.id}
              className="max-w-lg mx-auto my-6 bg-white rounded-lg shadow-md p-4"
            >
              <div className="p-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={myImage}
                      alt="myImage"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Programmer Rabbani</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>

                  {/* Three dot menu */}
                  <div className="relative">
                    <button
                      onClick={toggleMenu}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <IconDots stroke={2} />
                    </button>

                    {showMenu && (
                      <div
                        className="absolute right-5 mt-0 w-48 bg-white rounded-md shadow-2xl z-50"
                        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)" }}
                      >
                        <ul className="py-2">
                          <li
                            onClick={handleEditPost}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          >
                            <IconPencil stroke={2} className="w-5 h-5" />
                            Edit Post
                          </li>
                          <li
                            onClick={() => handleMoveToTrash(post.id)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          >
                            <IconTrash stroke={2} className="w-5 h-5" />
                            Move to Trash
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  {post.photo && (
                    <Image
                      src={post.photo}
                      alt="Post"
                      width={500}
                      height={500}
                      className="w-full object-cover rounded-lg"
                    />
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center text-gray-600 text-sm">
                    <div className="flex space-x-2">
                      <span>👍 4</span>
                      <span>❤️ 3</span>
                    </div>
                    <span>3 comments</span>
                  </div>

                  {/* border */}
                  <div className="my-1">
                    <div className="border border-gray-200"></div>
                    <div className="flex h-10 justify-around items-center">
                      <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
                        <i
                          className="inline-block w-5 h-5 bg-no-repeat"
                          style={{
                            backgroundImage:
                              "url('https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/JC3GCxn_mNT.png')",
                            backgroundPosition: "0 -735px",
                            backgroundSize: "auto",
                          }}
                        ></i>
                        <span>Like</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
                        <i
                          className="inline-block w-5 h-5 bg-no-repeat"
                          style={{
                            backgroundImage:
                              "url('https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/JC3GCxn_mNT.png')",
                            backgroundPosition: "0 -546px",
                            backgroundSize: "auto",
                          }}
                        ></i>
                        <span>Comment</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
                        <i
                          className="inline-block w-5 h-5 bg-no-repeat"
                          style={{
                            backgroundImage:
                              "url('https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/l0_7xEtHhVb.png')",
                            backgroundPosition: "0 -205px",
                            backgroundSize: "auto",
                          }}
                        ></i>
                        <span>Send</span>
                      </button>
                    </div>
                    {/* border */}
                    <div className="border border-gray-200"></div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <Image
                      src={myImage}
                      alt="Profile"
                      width={400}
                      height={400}
                      className="w-8 h-8 rounded-full"
                    />
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="bg-gray-100 rounded-full px-4 py-2 w-full focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="max-w-lg mx-auto my-6">
          <h3>Loading . . . . </h3>
        </div>
      )}
    </>
  );
}
