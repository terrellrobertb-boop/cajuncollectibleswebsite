"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initTeaserUpvotes } from "@/lib/teaser-upvotes";

/** Mounts the global teaser upvote injector on every marketing page load. */
export function TeaserUpvoteInit() {
  const pathname = usePathname();

  useEffect(() => {
    initTeaserUpvotes();
  }, [pathname]);

  return null;
}
