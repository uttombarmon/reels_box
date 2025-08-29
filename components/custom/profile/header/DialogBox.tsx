"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import PostForm from "./form/PostForm";
import ReelForm from "./form/ReelForm";
import StoryForm from "./form/StoryForm";

function DialogBox() {
  const [openForm, setOpenForm] = useState<"reel" | "post" | "story" | null>(
    null
  );

  // Function to render the correct form based on state
  const renderForm = () => {
    switch (openForm) {
      case "reel":
        return <ReelForm />;
      case "post":
        return <PostForm />;
      case "story":
        return <StoryForm />;
      default:
        return null;
    }
  };
  // Function to get the correct title for the dialog header
  const getDialogTitle = () => {
    switch (openForm) {
      case "reel":
        return "Create a New Reel";
      case "post":
        return "Create a New Post";
      case "story":
        return "Create a New Story";
      default:
        return "";
    }
  };
  return (
    <Dialog open={!!openForm} onOpenChange={() => setOpenForm(null)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className=" w-14 h-14 rounded-full bg-slate-50/15 hover:bg-slate-50/10 flex justify-center items-center">
            <PlusIcon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setOpenForm("reel")}>
            Reel
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenForm("post")}>
            Post
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenForm("story")}>
            Story
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            Fill in the details for your new {openForm}.
          </DialogDescription>
        </DialogHeader>

        {renderForm()}

        <DialogFooter>
          <Button onClick={() => setOpenForm(null)} variant="outline">
            Cancel
          </Button>
          <Button type="submit">Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;
