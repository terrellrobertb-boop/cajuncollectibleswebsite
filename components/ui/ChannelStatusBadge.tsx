import {
  channelStatusBadgeClass,
  getChannelStatus,
  type ChannelStatus,
} from "@/lib/channel-status";

type ChannelStatusBadgeProps = {
  status?: ChannelStatus;
  upcomingSlug?: string;
};

export function ChannelStatusBadge({
  status,
  upcomingSlug,
}: ChannelStatusBadgeProps) {
  const resolved = status ?? getChannelStatus(upcomingSlug);

  return (
    <span className={channelStatusBadgeClass(resolved)} data-channel-status={resolved}>
      {resolved}
    </span>
  );
}
