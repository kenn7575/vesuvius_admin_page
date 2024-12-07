import * as React from "react";
import {
  GalleryVerticalEnd,
  BookOpen,
  Salad,
  Clock8,
  UserRoundCog,
  UserRound,
  FolderCog,
  ChartColumn,
  House,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Hjem",
      url: "/",
      icon: <House size={20} strokeWidth={2.5} />,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <ChartColumn size={20} strokeWidth={2.5} />,
    },
    {
      title: "Administration",
      url: "#",
      icon: <FolderCog size={20} strokeWidth={2.5} />,
      items: [
        {
          title: "Menu genstande",
          url: "/menu-items",
          icon: <Salad size={20} strokeWidth={2.5} />,
        },
        {
          title: "Menu kategorier",
          url: "/menu-item-types",
          icon: <BookOpen size={20} strokeWidth={2.5} />,
        },
        {
          title: "Åbningstider",
          url: "/opening-hours",
          icon: <Clock8 size={20} strokeWidth={2.5} />,
        },
        {
          title: "Brugerroller",
          url: "/user-roles",
          icon: <UserRoundCog size={20} strokeWidth={2.5} />,
        },
        {
          title: "Brugere",
          url: "/users",
          icon: <UserRound size={20} strokeWidth={2.5} />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="z-[100]" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <Avatar>
                  <AvatarImage
                    src="/anders.webp"
                    alt="Anders And"
                    width={40}
                    height={40}
                    className="aspect-square object-cover"
                  />
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Anders And</span>
                  <span className="">Administrator</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    <span>{item.icon}</span> {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild className="ml-4">
                          <a href={item.url}>
                            <span className="mr-2">{item.icon}</span>
                            {item.title}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
