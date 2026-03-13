import NextImage from "next/image";
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/dashboard/page-header";
import prisma from "@/lib/prisma";

export default async function ProjectsPage() {
  const items = await prisma.project.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div>
      <PageHeader
        title="Project Showcase"
        description="Manage the projects displayed in your gallery."
        action={{
          label: "Add Project",
          icon: <Plus className="h-4 w-4" />,
        }}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Card
            key={item.name}
            className="group overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <div className="relative h-44 overflow-hidden">
              <NextImage
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              </div>
              <div className="absolute right-2 top-2">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 bg-black/40 p-0 text-white backdrop-blur hover:bg-black/60"
                      />
                    }
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Project #{String(i + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
