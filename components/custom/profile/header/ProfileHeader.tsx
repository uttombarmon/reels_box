"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/ClientApi";
import { ReelsUserI } from "@/types/ReelsUser";
import { UserPublic } from "@/types/UserPublic";
import { UserInterface } from "@/types/UTypes";
import { formatCount } from "@/utils/formatCounter";
import { Settings } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DialogBox from "./DialogBox";

const ProfileHeader = ({ uid }: { uid: string }) => {
  const [user, setUser] = useState<UserInterface | UserPublic | ReelsUserI>();
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  const uidd = uid;
  useEffect(() => {
    const fetchUser = async () => {
      if (uidd === uuid) {
        const response = await apiClient.GetAUser(uidd, false, true);
        console.log(response);
        setUser(response);
      } else {
        const response = await apiClient.GetAUser(uidd);
        setUser(response);
      }
    };
    fetchUser();
  }, [uidd]);

  useEffect(() => {
    if (user) {
      async function setFollowerAndFollowing() {
        const followersCount = Array.isArray(user?.followers)
          ? user.followers.length
          : typeof user?.followers === "number"
          ? user.followers
          : 0;
        const followersN = formatCount(followersCount);
        setFollowers(parseInt(followersN));

        const followingCount = Array.isArray(user?.following)
          ? user.following.length
          : typeof user?.following === "number"
          ? user.following
          : 0;
        const followingN = formatCount(followingCount);
        setFollowing(parseInt(followingN));
      }
      setFollowerAndFollowing();
    }
  }, [user]);

  return (
    <div className=" w-full">
      <div className=" w-fit h-fit flex flex-col justify-center items-center py-6">
        <div className=" w-full flex-col md:flex-row px-4 flex">
          {/* avatar  */}
          <Avatar className=" size-36 mx-6 my-6">
            <AvatarImage src={user?.image} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            {/* username and edit button  */}
            <div className=" flex gap-6 items-center flex-wrap py-4">
              {user?.username ? (
                <p className=" text-gray-400 font-bold">@{user?.username}</p>
              ) : (
                <p
                  className=" text-gray-400 font-bold"
                  title={user?._id?.toString()}
                >
                  @{user?._id?.toString().slice(0, 8) + "..."}
                </p>
              )}
              <Button variant="outline" className=" w-fit flex">
                Edit Profile <Settings />{" "}
              </Button>
            </div>
            {/* followers and following */}
            <div className="flex gap-6 items-center flex-wrap">
              <p>
                {followers + " "}{" "}
                <span className=" text-gray-400">followers</span>{" "}
              </p>
              <p>
                {following + " "}{" "}
                <span className=" text-gray-400">following</span>
              </p>
            </div>
            {/* name  */}
            <p className=" font-light text-lg py-2">{user?.name}</p>
            {/* bio  */}
            <p className=" text-sm text-gray-300">{user?.bio}</p>
          </div>
        </div>
        {/* add post, story buttons and story show sections */}
        <div className=" items-start self-start mx-5">
          <DialogBox />
          {/* <Dialog asChild>
            <DialogTrigger>
              <div className=" w-14 h-14 rounded-full bg-slate-50/15 hover:bg-slate-50/10 flex justify-center items-center">
                <Button variant="ghost" size="icon" className="size-8">
                  <PlusIcon />
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent>Hee</DialogContent>
          </Dialog> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
