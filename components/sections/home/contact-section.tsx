import { SectionContainer } from "@/components/shared/section-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  return (
    <SectionContainer id="contact" className="js-reveal pb-16 pt-10">
      <Card className="border-white/15 bg-white/6 text-white backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold sm:text-3xl">
            Contact Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/90">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                className="h-10 border-white/25 bg-black/25 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="h-10 border-white/25 bg-black/25 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="projectType" className="text-white/90">
                Project Type
              </Label>
              <Input
                id="projectType"
                placeholder="Logo, poster, social media, motion, etc."
                className="h-10 border-white/25 bg-black/25 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message" className="text-white/90">
                Message
              </Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell me about your timeline and goals"
                className="border-white/25 bg-black/25 text-white placeholder:text-white/50"
              />
            </div>
            <div className="md:col-span-2">
              <Button
                type="submit"
                className="h-11 rounded-full bg-[#ff7a18] px-6 text-sm font-bold text-black hover:bg-[#ffa35e]"
              >
                Send Inquiry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </SectionContainer>
  );
}
