import React from "react";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

interface EventBannerProps {
  title: string;
  subtitle?: string;
  host?: string;
  time?: string;
}

export default function EventBanner({
  title,
  subtitle = "",
  host = "",
  time = "",
}: EventBannerProps) {
  return (
    <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 flex items-center justify-between gap-4">
      <div>
        <div className="text-[10px] font-semibold text-yellow-800 uppercase tracking-wide mb-1">
          Pågår nå – arrangement
        </div>

        <div className="text-sm font-semibold text-yellow-900">
          {title}
        </div>

        {subtitle && (
          <div className="text-xs text-yellow-900/80">
            {subtitle}
          </div>
        )}
      </div>

      <div className="text-right text-[11px] text-yellow-900/80 hidden md:block">
        {host && (
          <div className="flex items-center gap-1 justify-end">
            <Crown className="h-3 w-3" />
            <span>Vert: {host}</span>
          </div>
        )}
        {time && <div>{time}</div>}
      </div>
    </div>
  );
}
