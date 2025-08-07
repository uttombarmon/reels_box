import { useEffect, useRef, useState } from "react";
export interface VI {
  id: number;
  videoUrl: string;
  title: string;
  user: {
    name: string;
    avatar: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}
export const VideoCard = ({
  video,
  isActive,
}: {
  video: VI;
  isActive: Boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Effect to handle video autoplay and pause based on visibility
  useEffect(() => {
    if (isActive) {
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.error("Video playback failed:", error);
        });
      }
      setIsPlaying(true);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Rewind the video
      }
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const formatCount = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num;
  };

  return (
    <div className="relative w-full h-screen snap-center overflow-hidden">
      {/* Video Player */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        loop
        muted={isMuted}
        playsInline
        className="object-cover w-full h-full"
      />

      {/* UI Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-gradient-to-t from-black/50 to-transparent">
        {/* Top-left UI (optional) */}
        <div className="absolute top-4 left-4">
          <button
            onClick={handleMuteToggle}
            className="p-2 rounded-full bg-black/50"
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.5 8.5h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5a1 1 0 011-1z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11l-2 2m0 0l-2-2m2 2v4m0-4h4"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11l-2 2m0 0l-2-2m2 2v4m0-4h4"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 10a1 1 0 11-2 0 1 1 0 012 0zM12 12a1 1 0 11-2 0 1 1 0 012 0zM15 14a1 1 0 11-2 0 1 1 0 012 0zM18 16a1 1 0 11-2 0 1 1 0 012 0z"
                />
                <path d="M15 11a3 3 0 11-6 0v-1a3 3 0 116 0v1z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.899a9 9 0 010 12.728M10 11a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 8v3a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4h4a4 4 0 014 4z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Bottom-left UI */}
        <div className="mb-8">
          <div className="flex items-center space-x-2">
            <img
              src={video.user.avatar}
              alt={video.user.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="font-bold">{video.user.name}</span>
            <button className="px-3 py-1 bg-red-600 rounded-full text-sm font-semibold">
              Follow
            </button>
          </div>
          <p className="mt-2 text-sm">{video.title}</p>
        </div>

        {/* Right-side action buttons */}
        <div className="absolute right-4 bottom-4 flex flex-col items-center space-y-4">
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
            <span className="text-xs font-semibold">
              {formatCount(video.stats.likes)}
            </span>
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
            <span className="text-xs font-semibold">
              {formatCount(video.stats.comments)}
            </span>
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
            <span className="text-xs font-semibold">
              {formatCount(video.stats.shares)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
