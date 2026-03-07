import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type SectionContainerProps = ComponentPropsWithoutRef<"section">;

export function SectionContainer({
  className,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "relative mx-auto w-full max-w-6xl px-6 py-10 md:px-10",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
