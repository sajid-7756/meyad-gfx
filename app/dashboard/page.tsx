import {
  Briefcase,
  Image,
  MessageSquareQuote,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { dashboardStats, contactMessages } from "@/data/dashboard-data";

export default function DashboardPage() {
  const recentMessages = contactMessages.slice(0, 4);

  return (
    <div>
      <PageHeader
        title="Dashboard Overview"
        description="Welcome back. Here is a summary of your portfolio site."
      />

      {/* Stat cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Projects"
          value={dashboardStats.totalProjects}
          // eslint-disable-next-line jsx-a11y/alt-text
          icon={<Image className="h-5 w-5" />}
        />
        <StatCard
          label="Services"
          value={dashboardStats.totalServices}
          icon={<Briefcase className="h-5 w-5" />}
        />
        <StatCard
          label="Testimonials"
          value={dashboardStats.totalTestimonials}
          icon={<MessageSquareQuote className="h-5 w-5" />}
        />
        <StatCard
          label="Unread Messages"
          value={dashboardStats.unreadMessages}
          icon={<Mail className="h-5 w-5" />}
          trend="2 new"
        />
      </div>

      {/* Recent messages */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
          <CardTitle className="text-lg text-white">Recent Messages</CardTitle>
          <a
            href="/dashboard/messages"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all <ArrowUpRight className="h-3 w-3" />
          </a>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Project Type
                </TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMessages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{msg.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {msg.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {msg.projectType}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {msg.date}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={msg.read ? "outline" : "default"}>
                      {msg.read ? "Read" : "New"}
                    </Badge>
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
