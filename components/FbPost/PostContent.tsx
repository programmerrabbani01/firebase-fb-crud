import Image from "next/image";
import React from "react";
import myImage from "@/public/my.jpg";
import { IconThumbUp } from "@tabler/icons-react";

export default function PostContent() {
  return (
    <>
      <div className="max-w-lg mx-auto my-6 bg-white rounded-lg shadow-md p-4">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <Image
              src={myImage}
              alt="myImage"
              className="w-10 h-10 object-cover rounded-full"
            />
            <div>
              <p className="text-sm font-medium">
                Ariyan Islam updated his profile picture
              </p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>

          <div className="mt-4">
            <Image
              src={myImage}
              alt="Post"
              className="w-full object-cover rounded-lg"
            />
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
      </div>{" "}
    </>
  );
}
