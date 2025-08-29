"use client";
import { LogOutIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
  const handleLogOut = async () => {
    await signOut();
  };
  return (
    <SidebarMenuItem className=" list-none" onClick={handleLogOut}>
      <SidebarMenuButton size={"xl"}>
        <LogOutIcon />
        Log Out
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default LogOutButton;
