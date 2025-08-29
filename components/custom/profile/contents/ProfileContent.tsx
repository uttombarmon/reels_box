import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Posts from "./post/Posts";
import Reels from "./reel/Reels";

const ProfileContent = ({ uid }: { uid: string }) => {
  return (
    <Tabs defaultValue="post" className=" w-full">
      <TabsList className=" w-full flex justify-around">
        <TabsTrigger value="post">Post</TabsTrigger>
        <TabsTrigger value="reel">Reel</TabsTrigger>
        <TabsTrigger value="saved" className={`${true ? "hidden" : "flex"}`}>
          Save
        </TabsTrigger>
      </TabsList>
      {/* <Separator className=" my-4" /> */}
      <TabsContent value="post">
        <Posts uid={uid} />
      </TabsContent>
      <TabsContent value="reel">
        <Reels uid={uid} />
      </TabsContent>
      <TabsContent value="saved">This is saved tab</TabsContent>
    </Tabs>
  );
};

export default ProfileContent;
