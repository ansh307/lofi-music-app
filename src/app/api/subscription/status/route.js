import { getServerSession } from "next-auth/next";

import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ subscribed: false }, { status: 401 });
  }

  const alwaysAllowedEmails = [
    "anshsoni55333@gmail.com",
    "jenneviedeasis@gmail.com",
  ];

  if (alwaysAllowedEmails.includes(session.user.email)) {
    return Response.json({ subscribed: true, free: true });
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const now = new Date();

  const isValid =
    subscription?.isActive && new Date(subscription.nextBillingDue) > now;

  return Response.json({ subscribed: isValid });
}
