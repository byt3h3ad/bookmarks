"use client";
import React from "react";

import { useTheme } from "next-themes";

export function ModeToggle({ count }: { count: string | number }) {
  const { setTheme, resolvedTheme } = useTheme();
  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);
  return (
    <h1 className="text-2xl cursor-pointer select-none" onClick={toggleTheme}>
      {count} bookmarks
    </h1>
  );
}
