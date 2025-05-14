"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    // Store the language preference in localStorage
    localStorage.setItem("i18nextLng", lng);
    // Change the language using i18n
    if (typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lng);
    } else if (typeof i18n.change === "function") {
      i18n.change(lng);
    } else {
      console.error("Unable to change language");
      // Fallback: reload the page with the new language
      window.location.reload();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("pt")}>
          🇧🇷 Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("es")}>
          🇪🇸 Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
