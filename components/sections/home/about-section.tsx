import { SectionContainer } from "@/components/shared/section-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

type AboutData = {
  title: string | null;
  id: number;
  content: string;
  updatedAt: Date;
}[];

export async function AboutSection() {
  const paragraphs: AboutData = await prisma.about.findMany();

  return (
    <SectionContainer id="about" className="js-reveal">
      <Card className="border-white/15 bg-white/6 text-white backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold">About Meyad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-white/80">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.id}>{paragraph.content}</p>
          ))}
        </CardContent>
      </Card>
    </SectionContainer>
  );
}
