"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCircle,
  Briefcase,
  Image,
  MessageSquareQuote,
  Mail,
  LinkIcon,
  PanelLeft,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getUnreadCount } from "@/app/dashboard/messages/actions";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "About", href: "/dashboard/about", icon: UserCircle },
  { label: "Services", href: "/dashboard/services", icon: Briefcase },
  { label: "Projects", href: "/dashboard/projects", icon: Image },
  {
    label: "Testimonials",
    href: "/dashboard/testimonials",
    icon: MessageSquareQuote,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: Mail,
  },
  { label: "Footer", href: "/dashboard/footer", icon: LinkIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    getUnreadCount().then(setUnreadCount);
  }, [pathname]);

  return (
    <TooltipProvider>
      <div className="dark">
        <SidebarProvider>
        <Sidebar collapsible="icon" className="border-r border-white/10 bg-[#0c0f14] text-[#f7f8fa]">
          <SidebarHeader className="p-4 border-b border-white/5">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm">
                M
              </div>
              <span className="text-sm font-bold tracking-[0.12em] group-data-[collapsible=icon]:hidden">
                MEYAD-GFX
              </span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={
                          item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.href)
                        }
                        tooltip={item.label}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                      {item.label === "Messages" && unreadCount > 0 && (
                        <SidebarMenuBadge className="bg-[#53e3ff] text-black font-bold">
                          {unreadCount}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-white/5">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => signOut()} tooltip="Sign Out" className="text-muted-foreground hover:text-foreground">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="relative bg-[#0e1116] text-[#f7f8fa]">
          {/* Main site signature glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,#53e3ff20,transparent_35%),radial-gradient(circle_at_85%_10%,#ff7a1820,transparent_30%),radial-gradient(circle_at_55%_75%,#7aff9320,transparent_35%)]" />

          <header className="relative z-10 flex h-14 items-center gap-2 border-b border-white/10 px-6 backdrop-blur-md">
            <SidebarTrigger className="-ml-2 text-white/70 hover:text-white">
              <PanelLeft className="h-4 w-4" />
            </SidebarTrigger>
            <Separator orientation="vertical" className="mx-2 h-5 bg-white/10" />
            <p className="text-sm font-medium text-white/50">
              Dashboard
            </p>
          </header>

          <main className="relative z-10 flex-1 p-6">{children}</main>
        </SidebarInset>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  );
}
