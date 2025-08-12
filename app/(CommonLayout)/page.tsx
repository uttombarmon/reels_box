"use client";

import VideoSkeleton from "@/components/custom/skeleton/Video";
import { VideoCard } from "@/components/custom/video/Video";
import { apiClient } from "@/lib/ClientApi";
import { VideoInterface } from "@/types/VTypes";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<VideoInterface[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // function to fetch videos
  const fetchMoreVideos = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const newVideos: VideoInterface[] = await apiClient.GetVideos(page);
    if (newVideos.length === 0) {
      setHasMore(false);
    } else {
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchMoreVideos();
  }, []);
  //handle scroll
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

    const newActiveIndex = Math.round(scrollTop / clientHeight);
    setActiveVideoIndex(newActiveIndex);

    if (scrollTop + clientHeight >= scrollHeight - 300) {
      // fetchMoreVideos();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [loading, hasMore]);

  return (
    <div className="font-sans antialiased text-gray-800 ">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");
        body {
          font-family: "Inter", sans-serif;
        }

        /* Hide scrollbar for the container */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>
      <main className="min-h-screen w-full flex items-center justify-center ">
        {videos.length > 0 ? (
          <div
            ref={containerRef}
            className="relative w-full min-w-sm md:min-w-md h-screen md:h-[95vh] rounded-lg overflow-y-scroll snap-y snap-mandatory shadow-lg hide-scrollbar"
          >
            {videos.map((video, index) => (
              <VideoCard
                key={String(video?.title)}
                video={video}
                isActive={index === activeVideoIndex}
              />
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-center justify-center h-20 text-gray-700 dark:text-white animate-pulse">
                Loading...
              </div>
            )}

            {/* "No more content" message */}
            {!hasMore && !loading && videos.length > 0 && (
              <div className="flex items-center justify-center h-20 dark:text-gray-400 text-gray-700">
                You&apos;ve reached the end!
              </div>
            )}
          </div>
        ) : (
          <div className="flex w-full items-center justify-center h-20 dark:text-gray-400 text-gray-700">
            <VideoSkeleton />
          </div>
        )}
      </main>
    </div>
  );
}
