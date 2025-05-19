"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Grid,
  Settings,
  Sun,
  ChevronDown
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="h-16 border-b border-border bg-card flex items-center justify-between px-4 bg-gradient-to-br from-[hsl(var(--sidebar-bg))] to-[hsl(var(--sidebar-bg)_/_0.9)]">
      {/* Left side - Search Bar */}
      <div className="flex items-center gap-2 w-1/3">
        {searchOpen ? (
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search something.."
              className="w-[300px] pl-9 h-9 bg-muted/70"
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={20} />
          </Button>
        )}

        {/* <Button variant="ghost" size="icon" className="text-muted-foreground">
          <span className="font-mono text-sm">⌘K</span>
        </Button> */}

        {/* <div className="ml-6 relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-muted-foreground flex items-center gap-2"
              >
                Pages <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Pages</DropdownMenuItem>
              <DropdownMenuItem>Applications</DropdownMenuItem>
              <DropdownMenuItem>UI Components</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>

      {/* Right side - User Profile, etc. */}
      <div className="flex items-center gap-2">
        {/* <Button variant="ghost" size="icon" className="text-muted-foreground">
          <div className="w-5 h-5 relative">
            <img
              src="https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/us.svg"
              alt="US"
              className="object-cover w-full h-full rounded"
            />
          </div>
        </Button> */}

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell size={20} />
        </Button>

        {/* <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Grid size={20} />
        </Button> */}

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings size={20} />
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Sun size={20} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pl-1">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">Dhanoo K.</p>
                  <p className="text-xs text-muted-foreground">Premium</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            {/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
