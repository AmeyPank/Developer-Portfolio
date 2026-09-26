import { prisma } from "@/lib/prisma";
import { logoutAction } from "@/app/actions/auth";
import {
  toggleMessageReadStatus,
  deleteContactMessage,
} from "@/app/actions/admin";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <main className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage incoming inquiries and portfolio contact requests.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* ✅ After */}
            <Link href="/admin/projects">
              <Button variant="outline" type="button">
                Manage Projects
              </Button>
            </Link>
            <form action={logoutAction}>
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Messages</CardDescription>
              <CardTitle className="text-3xl">{messages.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Unread Inquiries</CardDescription>
              <CardTitle className="text-3xl text-amber-500">
                {unreadCount}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>System Status</CardDescription>
              <CardTitle className="text-3xl text-emerald-500">
                Live (MySQL)
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Message Inbox */}
        <Card>
          <CardHeader>
            <CardTitle>Inquiries Inbox</CardTitle>
            <CardDescription>
              Messages sent through the contact form on your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No messages found. Test submitting one from your portfolio home
                page!
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {messages.map((item) => (
                  <div
                    key={item.id}
                    className={`py-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-colors ${
                      !item.read ? "bg-primary/5 -mx-4 px-4 rounded-lg" : ""
                    }`}
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">
                          {item.name}
                        </span>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-xs text-primary underline hover:opacity-80"
                        >
                          {item.email}
                        </a>
                        <span className="text-xs text-muted-foreground">
                          • {new Date(item.createdAt).toLocaleDateString()} at{" "}
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {!item.read && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground/90 whitespace-pre-wrap mt-1">
                        {item.message}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <form
                        action={toggleMessageReadStatus.bind(
                          null,
                          item.id,
                          item.read,
                        )}
                      >
                        <Button variant="ghost" size="sm" type="submit">
                          {item.read ? "Mark Unread" : "Mark Read"}
                        </Button>
                      </form>
                      <form action={deleteContactMessage.bind(null, item.id)}>
                        <Button
                          variant="destructive"
                          size="sm"
                          type="submit"
                          className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground border border-destructive/20"
                        >
                          Delete
                        </Button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
