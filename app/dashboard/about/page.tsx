"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/dashboard/page-header";
import { aboutParagraphs, heroStats } from "@/data/home-content";

export default function AboutPage() {
  const [paragraphs, setParagraphs] = useState(aboutParagraphs);
  const [stats, setStats] = useState(heroStats);

  return (
    <div>
      <PageHeader
        title="About Info"
        description="Manage your about section content and hero statistics."
        action={{
          label: "Save Changes",
          icon: <Save className="h-4 w-4" />,
        }}
      />

      {/* About paragraphs */}
      <Card className="mb-6 border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="text-lg text-white">About Paragraphs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {paragraphs.map((p, i) => (
            <div key={i} className="space-y-2">
              <Label htmlFor={`paragraph-${i}`}>Paragraph {i + 1}</Label>
              <Textarea
                id={`paragraph-${i}`}
                value={p}
                onChange={(e) => {
                  const updated = [...paragraphs];
                  updated[i] = e.target.value;
                  setParagraphs(updated);
                }}
                rows={3}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Hero stats */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="text-lg text-white">Hero Statistics</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor={`stat-value-${i}`}>Value</Label>
                  <Input
                    id={`stat-value-${i}`}
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[i] = { ...updated[i], value: e.target.value };
                      setStats(updated);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`stat-label-${i}`}>Label</Label>
                  <Input
                    id={`stat-label-${i}`}
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[i] = { ...updated[i], label: e.target.value };
                      setStats(updated);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
