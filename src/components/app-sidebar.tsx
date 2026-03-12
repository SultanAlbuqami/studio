"use client"

import * as React from "react"
import { Activity, TowerControl } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { dataAsOf } from "@/app/lib/dashboard-meta"
import {
  operationsNavigationItems,
  overviewNavigationItems,
  referenceNavigationItems,
} from "@/app/lib/navigation"

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

export function AppSidebar() {
  const pathname = usePathname()

  const renderNavSection = React.useCallback(
    (
      items: readonly (typeof overviewNavigationItems)[number][],
      size: "default" | "lg" = "default"
    ) =>
      items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.url}
            tooltip={item.title}
            size={size}
            className="rounded-[1.15rem] border border-transparent px-3 py-2.5 text-[13px] font-medium text-sidebar-foreground/86 transition-all hover:border-white/10 hover:bg-white/[0.04] hover:text-white data-[active=true]:border-primary/25 data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary/22 data-[active=true]:via-primary/10 data-[active=true]:to-transparent data-[active=true]:text-white data-[active=true]:shadow-[0_0_26px_rgba(73,177,255,0.18)] [&>svg]:text-primary/88 data-[active=true]:[&>svg]:text-primary"
          >
            <Link href={item.url}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )),
    [pathname]
  )

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="px-2 py-3 text-sidebar-foreground"
    >
      <SidebarHeader className="border-b border-sidebar-border/80 px-3 pb-4 pt-3">
        <div className="rounded-[1.65rem] border border-white/10 bg-gradient-to-br from-white/8 via-transparent to-primary/10 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_34px_rgba(2,8,24,0.38)]">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.2rem] border border-primary/25 bg-primary/12 text-primary shadow-[0_0_32px_rgba(73,177,255,0.24)]">
              <TowerControl className="h-5 w-5" />
            </div>
            <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sidebar-foreground/46">
                Salam PMO
              </span>
              <span className="mt-1 font-headline text-[1.05rem] font-semibold tracking-[-0.04em] text-sidebar-foreground">
                Control Tower
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-background/35 px-3 py-2.5 group-data-[collapsible=icon]:hidden">
            <div className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary/76">
                Executive mode
              </span>
            </div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-primary/82">
              Live
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu>{renderNavSection(overviewNavigationItems, "lg")}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-0">
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderNavSection(operationsNavigationItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/80 px-3 py-3">
        <div className="mb-2 rounded-[1.25rem] border border-white/10 bg-background/35 p-3 group-data-[collapsible=icon]:hidden">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
            Snapshot lock
          </p>
          <p className="mt-2 text-xs font-medium leading-relaxed text-sidebar-foreground/88">
            {dataAsOf}
          </p>
        </div>

        <SidebarMenu>{renderNavSection(referenceNavigationItems)}</SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
