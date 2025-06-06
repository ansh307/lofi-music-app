import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const priceId = process.env.STRIPE_PRICE_MONTHLY;

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: session.user.email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe/cancel`,
    billing_address_collection: "required", // prompts user for full billing address
    metadata: {
      userId: session.user.id,
    },
  });

  return NextResponse.json({ url: stripeSession.url });
}
