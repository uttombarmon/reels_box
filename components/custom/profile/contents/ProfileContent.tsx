import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfileContent = () => {
  return (
    <Tabs defaultValue="post" className=" w-full">
      <TabsList className=" w-full flex justify-around">
        <TabsTrigger value="post">Post</TabsTrigger>
        <TabsTrigger value="reel">Reel</TabsTrigger>
        <TabsTrigger value="saved">Save</TabsTrigger>
      </TabsList>
      {/* <Separator className=" my-4" /> */}
      <TabsContent value="post">This is post tab</TabsContent>
      <TabsContent value="reel">This is reel tab</TabsContent>
      <TabsContent value="saved">This is saved tab</TabsContent>
    </Tabs>
  );
};

export default ProfileContent;
