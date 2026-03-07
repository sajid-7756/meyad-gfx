import { SectionContainer } from "@/components/shared/section-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AboutSectionProps = {
  paragraphs: string[];
};

export function AboutSection({ paragraphs }: AboutSectionProps) {
  return (
    <SectionContainer id="about" className="js-reveal">
      <Card className="border-white/15 bg-white/6 text-white backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold">About Meyad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-white/80">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>
    </SectionContainer>
  );
}
