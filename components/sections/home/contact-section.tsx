"use client";

import { useState } from "react";
import { SectionContainer } from "@/components/shared/section-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage } from "@/app/actions/contact";
import { Loader2, CheckCircle2 } from "lucide-react";

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      await submitContactMessage(formData);
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionContainer id="contact" className="js-reveal pb-16 pt-10">
      <Card className="border-white/15 bg-white/6 text-white backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold sm:text-3xl">
            Contact Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
              <CheckCircle2 className="h-16 w-16 text-[#53e3ff]" />
              <div>
                <h3 className="text-xl font-bold">Message Sent Successfully!</h3>
                <p className="mt-2 text-white/70">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-6 border-white/20 hover:bg-white/10 bg-black/50"
                onClick={() => setIsSuccess(false)}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="h-10 border-white/25 bg-black/25 text-white placeholder:text-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="h-10 border-white/25 bg-black/25 text-white placeholder:text-white/50"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="projectType" className="text-white/90">
                  Project Type
                </Label>
                <Input
                  id="projectType"
                  name="projectType"
                  placeholder="Logo, poster, social media, motion, etc."
                  required
                  className="h-10 border-white/25 bg-black/25 text-white placeholder:text-white/50"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="message" className="text-white/90">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your timeline and goals"
                  required
                  className="border-white/25 bg-black/25 text-white placeholder:text-white/50"
                />
              </div>
              {error && (
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-red-500">{error}</p>
                </div>
              )}
              <div className="md:col-span-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 rounded-full bg-[#ff7a18] px-6 text-sm font-bold text-black hover:bg-[#ffa35e] disabled:opacity-70"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Inquiry
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </SectionContainer>
  );
}
