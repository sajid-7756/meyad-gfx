"use client";

import { useTransition } from "react";
import { Eye, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/dashboard/page-header";
import { markAsRead, deleteMessage } from "./actions";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  date: Date;
  read: boolean;
}

export default function MessagesClient({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [isPending, startTransition] = useTransition();

  const handleRead = (msg: ContactMessage) => {
    if (!msg.read) {
      startTransition(() => {
        markAsRead(msg.id);
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      startTransition(() => {
        deleteMessage(id);
      });
    }
  };

  return (
    <div>
      <PageHeader
        title="Contact Messages"
        description="View and manage messages from your contact form."
      />

      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sender</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Project Type
                </TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialMessages.map((msg) => (
                <TableRow
                  key={msg.id}
                  className={!msg.read ? "bg-primary/5" : ""}
                >
                  <TableCell>
                    <div>
                      <p
                        className={`text-sm ${!msg.read ? "font-semibold" : "font-medium"}`}
                      >
                        {msg.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {msg.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="text-xs">
                      {msg.projectType}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {new Date(msg.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={msg.read ? "outline" : "default"}>
                      {msg.read ? "Read" : "New"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Dialog onOpenChange={(open) => { if (open) handleRead(msg); }}>
                        <DialogTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            />
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>
                              Message from {msg.name}
                            </DialogTitle>
                            <DialogDescription>{msg.email}</DialogDescription>
                          </DialogHeader>
                          <Separator />
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Project Type
                              </span>
                              <Badge variant="outline">
                                {msg.projectType}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Date
                              </span>
                              <span>{new Date(msg.date).toLocaleString()}</span>
                            </div>
                            <Separator />
                            <div>
                              <p className="mb-2 text-sm font-medium">
                                Message
                              </p>
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {msg.message}
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        disabled={isPending}
                        onClick={() => handleDelete(msg.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
