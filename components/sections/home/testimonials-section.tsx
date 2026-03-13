import { SectionContainer } from "@/components/shared/section-container";
import { Card, CardContent } from "@/components/ui/card";
interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

type TestimonialsSectionProps = {
  items: Testimonial[];
};

export function TestimonialsSection({ items }: TestimonialsSectionProps) {
  return (
    <SectionContainer id="testimonials" className="js-reveal">
      <h2 className="mb-5 text-2xl font-extrabold sm:text-3xl">
        Client Testimonials
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.author}
            className="border-white/15 bg-white/5 text-white backdrop-blur-md"
          >
            <CardContent className="space-y-3 pt-4">
              <p className="text-sm leading-relaxed text-white/80">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-[#c7f6ff]">{item.author}</p>
                <p className="text-xs text-white/60">{item.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
