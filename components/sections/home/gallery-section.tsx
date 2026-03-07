"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GalleryItem } from "@/types/home";

type GallerySectionProps = {
  items: GalleryItem[];
};

function computeCardWidth(containerWidth: number): number {
  if (containerWidth < 640) return containerWidth - 32;
  if (containerWidth < 1024) return containerWidth * 0.65;
  return containerWidth * 0.52;
}

function computeGap(): number {
  if (typeof window === "undefined") return 24;
  return window.innerWidth < 640 ? 16 : 24;
}

export function GallerySection({ items }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cardWidth, setCardWidth] = useState(400);
  const [gap, setGap] = useState(24);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const currentTranslate = useRef(0);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Measure and store dimensions in state (never read refs during render)
  const measure = useCallback(() => {
    if (!viewportRef.current) return;
    const w = viewportRef.current.clientWidth;
    setCardWidth(computeCardWidth(w));
    setGap(computeGap());
  }, []);

  const goToSlide = useCallback(
    (index: number, duration = 0.7) => {
      if (!viewportRef.current) return;
      const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
      setActiveIndex(clampedIndex);

      // Read fresh dimensions from DOM (safe — inside event/callback, not render)
      const w = viewportRef.current.clientWidth;
      const cw = computeCardWidth(w);
      const g = computeGap();
      setCardWidth(cw);
      setGap(g);

      const target = -(clampedIndex * (cw + g));
      currentTranslate.current = target;

      if (animationRef.current) animationRef.current.kill();
      animationRef.current = gsap.to(trackRef.current, {
        x: target,
        duration,
        ease: "power3.out",
      });

      // Animate card scales
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isActive = i === clampedIndex;
        gsap.to(card, {
          scale: isActive ? 1 : 0.92,
          opacity: isActive ? 1 : 0.5,
          duration: duration * 0.8,
          ease: "power2.out",
        });
      });
    },
    [items.length]
  );

  // Initial measurement + resize listener
  useEffect(() => {
    measure();
    const handleResize = () => {
      measure();
      goToSlide(activeIndex, 0.3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, goToSlide, measure]);

  // Initialize GSAP scroll-trigger entrance animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Initial state: all cards hidden
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, {
          opacity: 0,
          y: 50,
          scale: 0.9,
        });
      });

      // Entrance animation triggered by scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            gsap.to(card, {
              opacity: i === 0 ? 1 : 0.5,
              y: 0,
              scale: i === 0 ? 1 : 0.92,
              duration: 0.8,
              delay: i * 0.1,
              ease: "power3.out",
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pointer-based drag handling
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      dragStartX.current = e.clientX;
      dragCurrentX.current = e.clientX;
      if (animationRef.current) animationRef.current.kill();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !viewportRef.current) return;
      dragCurrentX.current = e.clientX;
      const diff = dragCurrentX.current - dragStartX.current;

      const w = viewportRef.current.clientWidth;
      const cw = computeCardWidth(w);
      const g = computeGap();
      const base = -(activeIndex * (cw + g));
      // Apply resistance at edges
      let newX = base + diff;
      const maxX = 0;
      const minX = -((items.length - 1) * (cw + g));
      if (newX > maxX) newX = maxX + (newX - maxX) * 0.2;
      if (newX < minX) newX = minX + (newX - minX) * 0.2;

      gsap.set(trackRef.current, { x: newX });
    },
    [isDragging, activeIndex, items.length]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging || !viewportRef.current) return;
    setIsDragging(false);
    const diff = dragCurrentX.current - dragStartX.current;
    const w = viewportRef.current.clientWidth;
    const cw = computeCardWidth(w);
    const threshold = cw * 0.15;

    if (Math.abs(diff) > threshold) {
      if (diff < 0 && activeIndex < items.length - 1) {
        goToSlide(activeIndex + 1);
      } else if (diff > 0 && activeIndex > 0) {
        goToSlide(activeIndex - 1);
      } else {
        goToSlide(activeIndex);
      }
    } else {
      goToSlide(activeIndex);
    }
  }, [isDragging, activeIndex, items.length, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToSlide(activeIndex + 1);
      if (e.key === "ArrowLeft") goToSlide(activeIndex - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, goToSlide]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full py-16 md:py-24"
    >
      {/* Section header */}
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="js-reveal mb-2 text-xs font-semibold tracking-[0.22em] text-[#53e3ff]/70">
          SELECTED WORK
        </p>
        <h2 className="js-reveal mb-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
          Project Showcase
        </h2>
        <p className="js-reveal mb-10 max-w-lg text-base text-white/60 md:text-lg">
          Drag, swipe, or use the arrows to browse through the latest projects.
        </p>
      </div>

      {/* Carousel viewport */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          ref={trackRef}
          className="flex select-none items-stretch will-change-transform"
          style={{
            paddingLeft: `max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))`,
            gap: `${gap}px`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group relative shrink-0"
              style={{ width: `${cardWidth}px` }}
              onClick={() => {
                if (!isDragging) goToSlide(index);
              }}
            >
              {/* Card */}
              <div className="relative h-85 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-300 group-hover:border-[#53e3ff]/30 sm:h-100 md:h-115">
                {/* Image */}
                <Image
                  src={item.image}
                  alt={`${item.name} project preview`}
                  fill
                  className="pointer-events-none object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                  <div>
                    <p className="mb-1 text-xs font-semibold tracking-[0.14em] text-[#53e3ff]/80">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-bold text-white md:text-2xl">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-hover:border-[#53e3ff]/40 group-hover:text-[#53e3ff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                </div>

                {/* Index badge */}
                <div className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-xs font-bold text-white/70 backdrop-blur-sm md:left-8 md:top-8">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}

          {/* Spacer for last card */}
          <div className="shrink-0" style={{ width: "2rem" }} />
        </div>
      </div>

      {/* Navigation controls */}
      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-between px-6 md:px-10">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-[#53e3ff]"
                  : "w-2 bg-white/25 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex items-center gap-3">
          <span className="mr-2 text-sm text-white/40">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:border-[#53e3ff]/40 hover:bg-[#53e3ff]/10 hover:text-[#53e3ff] disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-white/5 disabled:hover:text-white/70"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={activeIndex === items.length - 1}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:border-[#53e3ff]/40 hover:bg-[#53e3ff]/10 hover:text-[#53e3ff] disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-white/5 disabled:hover:text-white/70"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
