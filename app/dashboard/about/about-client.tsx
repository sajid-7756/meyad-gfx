"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { updateAboutAndStats } from "./actions";

interface AboutParagraph {
  id: number;
  content: string;
}

interface HeroStat {
  id: number;
  label: string;
  value: string;
}

interface AboutClientProps {
  initialParagraphs: AboutParagraph[];
  initialStats: HeroStat[];
}

export default function AboutClient({ initialParagraphs, initialStats }: AboutClientProps) {
  const [paragraphs, setParagraphs] = useState(initialParagraphs);
  const [stats, setStats] = useState(initialStats);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateAboutAndStats({ paragraphs, stats });
    setIsSaving(false);
    
    if (result.success) {
      alert("Changes saved successfully!");
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div>
      <PageHeader
        title="About Info"
        description="Manage your about section content and hero statistics."
        action={{
          label: isSaving ? "Saving..." : "Save Changes",
          icon: isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />,
          onClick: handleSave,
        }}
      />

      {/* About paragraphs */}
      <Card className="mb-6 border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="text-lg text-white">About Paragraphs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {paragraphs.map((p, i) => (
            <div key={p.id} className="space-y-2">
              <Label htmlFor={`paragraph-${p.id}`}>Paragraph {i + 1}</Label>
              <Textarea
                id={`paragraph-${p.id}`}
                value={p.content}
                onChange={(e) => {
                  const updated = [...paragraphs];
                  updated[i] = { ...updated[i], content: e.target.value };
                  setParagraphs(updated);
                }}
                rows={3}
                className="border-white/10 bg-black/20"
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
              <div key={stat.id} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor={`stat-value-${stat.id}`}>Value</Label>
                  <Input
                    id={`stat-value-${stat.id}`}
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[i] = { ...updated[i], value: e.target.value };
                      setStats(updated);
                    }}
                    className="border-white/10 bg-black/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`stat-label-${stat.id}`}>Label</Label>
                  <Input
                    id={`stat-label-${stat.id}`}
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[i] = { ...updated[i], label: e.target.value };
                      setStats(updated);
                    }}
                    className="border-white/10 bg-black/20"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-[#53e3ff] text-black hover:bg-[#89edff]"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
