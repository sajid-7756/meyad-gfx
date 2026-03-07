import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useHomeAnimations(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".js-hero",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".js-hero-stats",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" }
      );

      gsap.utils.toArray<HTMLElement>(".js-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [root]);
}
