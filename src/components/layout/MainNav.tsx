"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  Menu,
  Leaf,
  Home,
  LayoutDashboard,
  Calculator,
  FlaskConical,
  ShoppingBag,
  Settings,
  LogOut,
} from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="h-4 w-4 mr-2" />,
      active: pathname === "/",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/calculator",
      label: "Calculator",
      icon: <Calculator className="h-4 w-4 mr-2" />,
      active: pathname === "/calculator",
    },
    {
      href: "/recipes",
      label: "Recipes",
      icon: <FlaskConical className="h-4 w-4 mr-2" />,
      active: pathname === "/recipes",
    },
    // Shop page archived for future improvement
    // {
    //   href: "/shop",
    //   label: "Shop",
    //   icon: <ShoppingBag className="h-4 w-4 mr-2" />,
    //   active: pathname === "/shop",
    // },
  ];

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-primary/10 p-1 rounded-md">
          <Leaf className="h-6 w-6 text-primary" />
        </div>
        <span className="font-bold text-xl hidden md:inline-block">
          Bora Grow
        </span>
      </Link>

      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>

      <div className="flex md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {routes.map((route) => (
              <DropdownMenuItem key={route.href} asChild>
                <Link
                  href={route.href}
                  className={cn(
                    "flex items-center w-full",
                    route.active ? "font-medium" : "",
                  )}
                >
                  {route.icon}
                  {route.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center w-full">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/login" className="flex items-center w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="ml-auto flex items-center space-x-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
