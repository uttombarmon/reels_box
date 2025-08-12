import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Compass,
  Home,
  Inbox,
  SearchIcon,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import SearchInput from "./Search";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Trending",
    url: "trending",
    icon: Compass,
  },
  {
    title: "Profile",
    url: "profile",
    icon: User,
  },
  {
    title: "Message",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Following",
    url: "following",
    icon: Users,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
const NavViewXL = () => {
  return (
    <Sidebar collapsible="icon">
      <div className=" w-full flex justify-end">
        <SidebarTrigger />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>REELSBOX</SidebarGroupLabel>
          <div className=" px-2 my-4 text-2xl w-full">
            <Popover>
              <PopoverTrigger className=" flex justify-start w-[16rem] gap-2 items-center">
                <SearchIcon /> Search
              </PopoverTrigger>
              <PopoverContent className=" ">
                <SearchInput />
              </PopoverContent>
            </Popover>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton size={"xl"} asChild>
                    <Link href={item.url ?? "#"} className=" text-2xl">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default NavViewXL;
