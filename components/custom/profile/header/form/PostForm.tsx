import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Image, Lock, Smile, Tag, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

function PostForm() {
  const [postContent, setPostContent] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false);

  // Watch for changes in the postContent field to enable/disable the post button
  useEffect(() => {
    setIsPostButtonEnabled(postContent.trim().length > 0);
  }, [postContent]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postContent.trim().length === 0) {
      alert("Post content cannot be empty.");
      return;
    }
    const postData = {
      postContent,
      visibility,
    };
    console.log("Post data submitted:", postData);
    alert("Post submitted! Check the console for data.");
    // In a real application, you would send this data to an API
  };

  // Helper function to get the correct icon for visibility
  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "public":
        return <Globe className="w-4 h-4" />;
      case "friends":
        return <Users className="w-4 h-4" />;
      case "private":
        return <Lock className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-lg shadow-2xl rounded-xl">
        {/* Post Creator Header */}
        <CardHeader className="flex flex-row items-center space-x-4 p-4 ">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt="User Avatar"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">John Doe</h3>
            {/* Visibility Selector */}
            <Select
              onValueChange={(value) => setVisibility(value)}
              defaultValue="public"
            >
              <SelectTrigger className="w-fit h-6 px-2 text-xs text-gray-600 bg-gray-200 rounded-lg">
                <div className="flex items-center space-x-1">
                  {getVisibilityIcon(visibility)}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center space-x-2">
                    <span>Public</span>
                  </div>
                </SelectItem>
                <SelectItem value="friends">
                  <div className="flex items-center space-x-2">
                    <span>Friends</span>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center space-x-2">
                    <span>Only me</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        {/* Post Content Body */}
        <CardContent className="p-2 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Post Textarea Field */}
            <Textarea
              placeholder="What's on your mind, John?"
              className="min-h-[100px] focus:bg-transparent bg-none text-lg border-none  resize-none p-0 placeholder:text-gray-400"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />

            {/* Action Buttons Section */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  className="rounded-full h-10 w-10 p-0 text-gray-500 hover:bg-gray-200"
                  title="Photo/Video"
                >
                  <Image className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full h-10 w-10 p-0 text-gray-500 hover:bg-gray-200"
                  title="Tag People"
                >
                  <Tag className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full h-10 w-10 p-0 text-gray-500 hover:bg-gray-200"
                  title="Feeling/Activity"
                >
                  <Smile className="h-6 w-6" />
                </Button>
              </div>
              {/* Post Button */}
              <Button
                type="submit"
                disabled={!isPostButtonEnabled}
                className="px-6 py-2 rounded-full font-bold transition-all duration-200
                disabled:bg-blue-400 disabled:cursor-not-allowed
                bg-blue-600 text-white hover:bg-blue-700"
              >
                Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostForm;
