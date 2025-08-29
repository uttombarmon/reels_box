"use client";
import { LogInIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

const LogInButton = () => {
  const redirectLogin = () => {
    redirect("/login");
  };
  return (
    <SidebarMenuItem className=" list-none" onClick={redirectLogin}>
      <SidebarMenuButton size={"xl"}>
        <LogInIcon />
        Log In
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default LogInButton;
