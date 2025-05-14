"use client";

import { ReactNode, useEffect } from "react";
import i18n from "@/lib/i18n";
import { I18nextProvider } from "react-i18next";

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize i18n on the client side
    try {
      const savedLang = localStorage.getItem("i18nextLng");
      if (savedLang) {
        i18n.changeLanguage(savedLang);
      }
    } catch (error) {
      console.error("Error initializing language:", error);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
