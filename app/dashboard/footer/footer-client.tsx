"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, Pencil, Trash2, ExternalLink, Globe, Instagram, Facebook, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/dashboard/page-header";
import { createSocialLink, updateSocialLink, deleteSocialLink } from "./actions";

type FooterLink = {
  id: string;
  label: string;
  href: string;
  type: string;
  icon: string | null;
};

const iconMap: Record<string, React.ReactNode> = {
  instagram: <Instagram className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  globe: <Globe className="h-4 w-4" />,
};

export default function FooterClient({ socialLinks }: { socialLinks: FooterLink[] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);
  const [deletingLink, setDeletingLink] = useState<FooterLink | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingLink(null);
    setError(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (link: FooterLink) => {
    setEditingLink(link);
    setError(null);
    setIsDialogOpen(true);
  };

  const handleOpenDelete = (link: FooterLink) => {
    setDeletingLink(link);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      if (editingLink) {
        await updateSocialLink(editingLink.id, formData);
      } else {
        await createSocialLink(formData);
      }
      
      setIsDialogOpen(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingLink) return;
    setIsLoading(true);
    try {
      await deleteSocialLink(deletingLink.id);
      setIsDeleteDialogOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to delete link.");
    } finally {
      setIsLoading(false);
      setDeletingLink(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Footer Links"
        description="Manage social media links in the footer."
        action={{
          label: "Add Link",
          icon: <Plus className="h-4 w-4" />,
          onClick: handleOpenAdd,
        }}
      />

      {/* Social Links */}
      <Card className="mb-6 border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Social Links</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Icon</TableHead>
                <TableHead>Label</TableHead>
                <TableHead className="hidden sm:table-cell">URL</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {socialLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {link.icon && iconMap[link.icon] ? iconMap[link.icon] : <Globe className="h-4 w-4" />}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{link.label}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.href}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          />
                        }
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenEdit(link)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleOpenDelete(link)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {socialLinks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No social links found. Add one to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingLink ? "Edit Social Link" : "Add Social Link"}
            </DialogTitle>
            <DialogDescription>
              Configure the social media link details. Keep the label short.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                name="label"
                defaultValue={editingLink?.label || ""}
                placeholder="E.g. Instagram"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="href">URL</Label>
              <Input
                id="href"
                name="href"
                type="url"
                defaultValue={editingLink?.href || ""}
                placeholder="https://instagram.com/yourhandle"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select name="icon" defaultValue={editingLink?.icon || "globe"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="globe">Globe (Generic)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="bg-[#53e3ff] text-black hover:bg-[#53e3ff]/80">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingLink ? "Save Changes" : "Create Link"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Social Link</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this social link? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
