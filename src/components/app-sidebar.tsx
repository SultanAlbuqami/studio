"use client"

import * as React from "react"
import {
  LayoutDashboard,
  ClipboardList,
  Truck,
  Star,
  Users,
  AlertTriangle,
  Search,
  BookOpen,
  ChevronRight,
  TowerControl
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Executive Overview",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Booking & Fulfillment",
    url: "/booking",
    icon: ClipboardList,
  },
  {
    title: "Delivery Control Tower",
    url: "/delivery",
    icon: Truck,
  },
  {
    title: "Strategic Orders",
    url: "/strategic",
    icon: Star,
  },
  {
    title: "B2C Snapshot",
    url: "/b2c",
    icon: Users,
  },
  {
    title: "Escalations & Recovery",
    url: "/escalations",
    icon: AlertTriangle,
  },
  {
    title: "Portfolio Explorer",
    url: "/explorer",
    icon: Search,
  },
  {
    title: "Sources & Methodology",
    url: "/methodology",
    icon: BookOpen,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border/50 py-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <TowerControl className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-sm tracking-tight">SALAM PMO</span>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">Control Tower</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {pathname === item.url && <ChevronRight className="ml-auto h-3 w-3" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
