"use client";
import { VideoCard } from "@/components/custom/video/Video";
import { ModeToggle } from "@/components/shared/ThemeChange";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scroll events to detect which video is in view
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const newActiveIndex = Math.round(scrollPosition / windowHeight);
      setActiveVideoIndex(newActiveIndex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);
  const MOCK_VIDEOS = [
    {
      id: 1,
      videoUrl:
        "https://cdn.glitch.me/c7f66710-f1d2-45e0-8197-28d11d13f9c3/short-video-1.mp4",
      title: "Beautiful scenery",
      user: {
        name: "Traveler123",
        avatar: "https://placehold.co/40x40/000000/FFFFFF?text=T",
      },
      stats: {
        likes: 1245,
        comments: 32,
        shares: 15,
      },
    },
    {
      id: 2,
      videoUrl:
        "https://cdn.glitch.me/c7f66710-f1d2-45e0-8197-28d11d13f9c3/short-video-2.mp4",
      title: "Coding is fun!",
      user: {
        name: "DevGuru",
        avatar: "https://placehold.co/40x40/000000/FFFFFF?text=D",
      },
      stats: {
        likes: 5678,
        comments: 145,
        shares: 89,
      },
    },
    {
      id: 3,
      videoUrl:
        "https://cdn.glitch.me/c7f66710-f1d2-45e0-8197-28d11d13f9c3/short-video-3.mp4",
      title: "Workout motivation",
      user: {
        name: "FitnessPro",
        avatar: "https://placehold.co/40x40/000000/FFFFFF?text=F",
      },
      stats: {
        likes: 987,
        comments: 50,
        shares: 10,
      },
    },
    {
      id: 4,
      videoUrl:
        "https://cdn.glitch.me/c7f66710-f1d2-45e0-8197-28d11d13f9c3/short-video-4.mp4",
      title: "Artistic creation",
      user: {
        name: "ArtisticSoul",
        avatar: "https://placehold.co/40x40/000000/FFFFFF?text=A",
      },
      stats: {
        likes: 2345,
        comments: 78,
        shares: 20,
      },
    },
    {
      id: 5,
      videoUrl:
        "https://cdn.glitch.me/c7f66710-f1d2-45e0-8197-28d11d13f9c3/short-video-5.mp4",
      title: "Delicious recipe",
      user: {
        name: "FoodieCorner",
        avatar: "https://placehold.co/40x40/000000/FFFFFF?text=F",
      },
      stats: {
        likes: 7890,
        comments: 201,
        shares: 105,
      },
    },
  ];
  return (
    <div className=" min-h-screen w-full flex items-center justify-center relative">
      <div
        ref={containerRef}
        className="relative w-full max-w-sm h-screen snap-y snap-mandatory bg-black shadow-lg"
      >
        {MOCK_VIDEOS.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            isActive={index === activeVideoIndex}
          />
        ))}
      </div>
      <div className=" absolute top-4 right-4 w-fit">
        <ModeToggle />
      </div>
    </div>
  );
}
