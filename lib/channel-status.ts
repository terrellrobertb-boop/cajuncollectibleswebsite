import {
  upcomingChannel,
  type ChannelStatus,
} from "@/content/upcoming-channel";
import { cn } from "@/lib/utils";

export type { ChannelStatus };

export function getChannelStatus(upcomingSlug?: string): ChannelStatus {
  if (!upcomingSlug) return "Coming Soon";
  const item = upcomingChannel.find((entry) => entry.slug === upcomingSlug);
  return item?.status ?? "Coming Soon";
}

export function channelStatusBadgeClass(status: ChannelStatus) {
  const base =
    "inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm";

  switch (status) {
    case "In Progress":
      return cn(base, "bg-gold/35 text-charcoal ring-1 ring-gold/40");
    case "Recording":
      return cn(base, "bg-orange/30 text-cream ring-1 ring-orange/50");
    case "Coming Soon":
      return cn(base, "bg-charcoal/20 text-cream/90 ring-1 ring-charcoal/25");
  }
}
