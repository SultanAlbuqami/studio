"use client"

import * as React from "react"
import { TowerControl } from "lucide-react"
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
import { ThemeToggle } from '@/components/theme-toggle';

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
            className="rounded-[1rem] border border-transparent px-3 py-2.5 text-[13px] font-medium text-sidebar-foreground/82 transition-all hover:border-white/8 hover:bg-white/[0.03] hover:text-white data-[active=true]:border-primary/30 data-[active=true]:bg-primary/[0.14] data-[active=true]:text-white data-[active=true]:shadow-[0_0_0_1px_rgba(73,177,255,0.16),0_12px_24px_rgba(8,15,40,0.24)] [&>svg]:text-primary/82 data-[active=true]:[&>svg]:text-primary"
          >
            <Link
              href={item.url}
              aria-current={pathname === item.url ? 'page' : undefined}
            >
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
        <div className="rounded-[1.45rem] border border-white/8 bg-gradient-to-br from-white/6 via-transparent to-primary/6 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_24px_rgba(2,8,24,0.24)]">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.1rem] border border-primary/18 bg-primary/10 text-primary">
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
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup className="px-0">
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
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
        <div className="mb-2 rounded-[1.15rem] border border-white/8 bg-background/25 p-3 group-data-[collapsible=icon]:hidden">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
            Snapshot lock
          </p>
          <p className="mt-2 text-xs leading-relaxed text-sidebar-foreground/82">
            {dataAsOf}
          </p>
          <div className="mt-3">
            <ThemeToggle compact />
          </div>
        </div>

        <SidebarMenu>{renderNavSection(referenceNavigationItems)}</SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
