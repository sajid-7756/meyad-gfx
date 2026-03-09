"use client";

import { useRef } from "react";
import { useHomeAnimations } from "@/hooks/use-home-animations";

interface HomeClientProps {
  children: React.ReactNode;
}

export function HomeClient({ children }: HomeClientProps) {
  const rootRef = useRef<HTMLElement>(null);

  useHomeAnimations(rootRef);

  return (
    <main
      ref={rootRef}
      className="relative min-h-screen overflow-hidden bg-[#0e1116] text-[#f7f8fa]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,#53e3ff33,transparent_35%),radial-gradient(circle_at_85%_10%,#ff7a1833,transparent_30%),radial-gradient(circle_at_55%_75%,#7aff9330,transparent_35%)]" />
      {children}
    </main>
  );
}
