"use client";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/ClientApi";
import { ReelsUserI } from "@/types/ReelsUser";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";

function LeftOverlay({
  userId,
  title,
  desc,
}: {
  userId: string;
  title: string;
  desc: string;
}) {
  const [user, setUser] = useState<ReelsUserI>();

  useEffect(() => {
    async function fetchdata() {
      if (userId) {
        const data = await apiClient.GetAUser(userId, true);
        if (data) {
          // console.log("Condition data:", data);
          setUser(data as ReelsUserI);
        }
      }
    }
    fetchdata();
  }, [userId]);
  // useEffect(() => {
  //   if (user) {
  //     console.log("User state has been set:", user);
  //   }
  // }, [user]);
  return (
    user && (
      <div className="mb-2">
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10 border-2 rounded-full">
            <AvatarImage
              src={user?.image?.toString()}
              alt={user?.name?.toString()}
            />
            <AvatarFallback>
              {user?.username
                ? user?.username?.toString().charAt(0)
                : user?.name?.toString().charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-bold">
            {String(user?.username ? user?.username : user?.name)}
          </span>
          <Button className="rounded-full px-3 py-1 text-xs font-semibold bg-red-700 hover:bg-red-800 text-white">
            Follow
          </Button>
        </div>
        <p className="mt-2 font-bold text-sm">{title}</p>
        <p className="mt-2 text-sm">{desc}</p>
      </div>
    )
  );
}

export default LeftOverlay;
