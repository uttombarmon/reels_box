import { formatCount } from "@/utils/formatCounter";
import mongoose from "mongoose";
import React from "react";
interface RightOverlayProps {
  likes: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
}

export const RightOverlay: React.FC<RightOverlayProps> = ({
  likes,
  comments,
}) => {
  return (
    <div className="absolute right-4 bottom-20 z-10 flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center">
        <button className="p-3 bg-white/20 rounded-full mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span className="text-xs font-semibold">{formatCount(10)}</span>
      </div>
      <div className="flex flex-col items-center">
        <button className="p-3 bg-white/20 rounded-full mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
        <span className="text-xs font-semibold">{formatCount(199)}</span>
      </div>
      <div className="flex flex-col items-center">
        <button className="p-3 bg-white/20 rounded-full mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.315l4.743 4.743m-4.743-4.743L12 12m4.743-4.743l-4.743-4.743m-4.743 4.743L12 12m-4.743 4.743l4.743-4.743m4.743-4.743l-4.743 4.743M12 12l-4.743-4.743"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9 9 0 100-18 9 9 0 000 18z"
            />
          </svg>
        </button>
        <span className="text-xs font-semibold">{formatCount(36)}</span>
      </div>
    </div>
  );
};
