import { NextRequest } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata?.userId;
    if (!userId) return new Response("No userId", { status: 400 });

    const now = new Date();
    const nextBillingDue = new Date(now);
    nextBillingDue.setMonth(now.getMonth() + 1);

    await prisma.subscription.upsert({
      where: { userId },
      update: {
        isActive: true,
        currentPrice: 199,
        nextBillingDue,
      },
      create: {
        userId,
        isActive: true,
        currentPrice: 199,
        startDate: now,
        nextBillingDue,
      },
    });
  }

  return new Response("Success", { status: 200 });
}
