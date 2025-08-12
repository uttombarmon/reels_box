import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const ProfileHeader = () => {
  return (
    <div className=" w-full">
      <div className=" w-fit h-fit flex flex-col justify-center items-center py-6">
        <div className=" w-full flex-col md:flex-row px-4 flex">
          {/* avatar  */}
          <Avatar className=" size-36 mx-6 my-6">
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            {/* username and edit button  */}
            <div className=" flex gap-6 items-center flex-wrap py-4">
              <p className=" text-gray-400 font-bold">@{"nomeff"}</p>
              <Button variant="outline" className=" w-fit flex">
                Edit Profile <Settings />{" "}
              </Button>
            </div>
            {/* followers and following */}
            <div className="flex gap-6 items-center flex-wrap">
              <p>
                {123 + " "} <span className=" text-gray-400">followers</span>{" "}
              </p>
              <p>
                {123 + " "} <span className=" text-gray-400">following</span>
              </p>
            </div>
            {/* name  */}
            <p className=" font-light text-lg py-2">No Nameff</p>
            {/* bio  */}
            <p className=" text-sm text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
              deserunt earum quibusdam accusamus esse, eos, rem sunt magnam
              adipisci atque ipsum veritatis ad tenetur at dolore quo quam? V
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
