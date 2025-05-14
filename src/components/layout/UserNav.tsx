"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, Crown, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function UserNav() {
  const router = useRouter();
  const { user, profile, signOut, isAdmin, subscriptionTier } = useAuth();

  if (!user) {
    return (
      <Button variant="outline" onClick={() => router.push("/login")}>
        Login
      </Button>
    );
  }

  const isPremium = subscriptionTier !== "free";
  const avatarUrl =
    profile?.avatar_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name || user.email}`;
  const displayName = profile?.name || user.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {isPremium && (
                <div className="flex items-center text-xs text-amber-500">
                  <Crown className="h-3 w-3 mr-1" />
                  {subscriptionTier.charAt(0).toUpperCase() +
                    subscriptionTier.slice(1)}
                </div>
              )}
              {isAdmin && (
                <div className="flex items-center text-xs text-blue-500">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Admin
                </div>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          {isPremium ? (
            <DropdownMenuItem onClick={() => router.push("/pricing")}>
              <Crown className="mr-2 h-4 w-4 text-amber-500" />
              <span>My Subscription</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => router.push("/pricing")}>
              <Crown className="mr-2 h-4 w-4" />
              <span>Upgrade to Premium</span>
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem onClick={() => router.push("/admin")}>
              <ShieldCheck className="mr-2 h-4 w-4 text-blue-500" />
              <span>Admin Panel</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
