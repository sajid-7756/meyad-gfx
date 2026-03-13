import prisma from "@/lib/prisma";
import MessagesClient from "./messages-client";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { date: "desc" },
  });

  return <MessagesClient initialMessages={messages} />;
}
