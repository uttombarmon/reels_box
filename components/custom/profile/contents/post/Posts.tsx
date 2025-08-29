"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/ClientApi";
import { PostInterface } from "@/types/Post";
import { AlertCircle, File } from "lucide-react";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

// --- Main ProfilePosts Component ---
export default function Posts({ uid }: { uid: string }) {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (uid) {
      const fetchPosts = async () => {
        try {
          setIsLoading(true);
          const userPosts: PostInterface[] = await apiClient.GetPosts(uid);
          console.log(userPosts);
          if (userPosts) {
            setPosts(userPosts);
            setIsLoading(false);
          }
        } catch (err) {
          setError("Failed to fetch posts.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPosts();
    }
  }, [uid]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-center space-x-4">
            <div className=" min-w-sm xl:min-w-xl items-center">
              <div className=" flex justify-center w-full">
                <Skeleton className="h-12 w-12 rounded-full mr-2" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <Skeleton className="aspect-square w-full min-h-72 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 min-h-3/6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (posts.length > 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {posts.map((post) => (
            <PostCard key={post._id.toString()} post={post} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <Alert>
        <File className="h-4 w-4" />
        <AlertTitle>No Posts</AlertTitle>
        <AlertDescription>This user has no posts yet.</AlertDescription>
      </Alert>
    </div>
  );
}
