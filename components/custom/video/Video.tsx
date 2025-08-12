"use client";
import { Button } from "@/components/ui/button";
import { VideoInterface } from "@/types/VTypes";
import { Video } from "@imagekit/next";
import { PauseIcon, PlayIcon, Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LeftOverlay from "./LeftOverlay";
import { RightOverlay } from "./RightOverlay";

interface VideoCardProps {
  video: VideoInterface;
  isActive: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playing, setPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  // const [likesCount, setLikesCount] = useState<Number>(0)

  // // Auto-play/pause logic based on visibility
  // useEffect(() => {
  //   if (videoRef.current) {
  //     if (isActive) {
  //       videoRef.current.play().catch((error) => {
  //         console.error("Video playback failed:", error);
  //       });
  //       setPlaying(true);
  //     } else {
  //       videoRef.current.pause();
  //       videoRef.current.currentTime = 0;
  //       setPlaying(false);
  //     }
  //   }
  // }, [isActive, playing]);
  // Intersection Observer to handle autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch((error) => {
              console.error("Video playback failed:", error);
            });
            setPlaying(true);
          } else {
            console.log(
              `Video ID: ${video.id} is now out of view. Pausing and resetting.`
            );
            // Video is out of the viewport, so we pause it and reset its time.
            videoRef.current?.pause();
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
            setPlaying(false);
          }
        });
      },
      {
        threshold: 1.0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup function: disconnect the observer when the component unmounts
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const manualHandlePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current?.pause();
      } else {
        videoRef.current?.play().catch((error) => {
          console.error("Video playback failed:", error);
        });
      }
    }
    setPlaying(!playing);
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  return (
    video && (
      <div className="relative w-full h-screen snap-center" ref={containerRef}>
        {/* Video Player */}
        <Video
          ref={videoRef}
          src={video?.url}
          loop
          muted={isMuted}
          playsInline
          className="object-cover w-full h-full"
        />

        {/* UI Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-gradient-to-t from-black/50 to-transparent">
          {/* Mute button */}
          <div className="absolute top-4 left-4">
            <Button
              onClick={handleMuteToggle}
              variant="ghost"
              className="bg-black/50 hover:bg-black/70 rounded-full p-2 h-auto"
            >
              {isMuted ? <VolumeOff /> : <Volume2 />}
            </Button>
          </div>
          <div className=" absolute top-4 right-4">
            <Button
              onClick={manualHandlePlay}
              variant={"ghost"}
              className="bg-black/50 hover:bg-black/70 rounded-full p-2 h-auto"
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </Button>
          </div>

          {/* Bottom-left UI */}
          <LeftOverlay
            userId={video?.userId?.toString()}
            title={video?.title}
            desc={video?.description ?? ""}
          />
          <RightOverlay likes={video?.likes} comments={video?.commentsCount} />
        </div>
      </div>
    )
  );
};
