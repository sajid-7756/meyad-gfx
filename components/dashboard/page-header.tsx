import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type PageHeaderProps = {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
    icon?: ReactNode;
  };
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-1 text-sm text-white/50">{description}</p>
      </div>
      {action && (
        <Button onClick={action.onClick} className="w-fit gap-2 bg-[#53e3ff] text-black hover:bg-[#53e3ff]/80">
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
}
