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
  TowerControl,
  BookOpen,
  Rocket,
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
  SidebarFooter,
} from "@/components/ui/sidebar"

const overviewItems = [
  { title: "Executive Overview", url: "/", icon: LayoutDashboard },
  { title: "Portfolio Explorer", url: "/explorer", icon: Search },
]

const operationsItems = [
  { title: "Booking & Fulfillment", url: "/booking", icon: ClipboardList },
  { title: "Delivery Control Tower", url: "/delivery", icon: Truck },
  { title: "Strategic Orders", url: "/strategic", icon: Star },
  { title: "B2C Fulfillment", url: "/b2c", icon: Users },
  { title: "Escalations & Recovery", url: "/escalations", icon: AlertTriangle },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border py-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary">
            <TowerControl className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">Salam PMO</span>
            <span className="text-sm font-semibold tracking-tight">Control Tower</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {overviewItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operationsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/deployment'} tooltip="Deployment Roadmap">
              <Link href="/deployment">
                <Rocket className="h-4 w-4" />
                <span>Deployment Roadmap</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/methodology'} tooltip="Data Governance">
              <Link href="/methodology">
                <BookOpen className="h-4 w-4" />
                <span>Data Governance</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
