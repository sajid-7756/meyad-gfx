import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
};

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#53e3ff]/10 text-[#53e3ff]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-white/50">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-white">{value}</p>
            {trend && (
              <span className="text-xs font-medium text-[#7aff93]">
                {trend}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
