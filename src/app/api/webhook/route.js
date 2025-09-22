import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/db/db";
import Profile from "@/models/profile.model";

// This Stripe instance uses your main secret key to verify incoming webhook events.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  // 1. Get the signature from the request headers
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    // 2. Use the signature to securely verify that the request is genuinely from Stripe
    const body = await req.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    // Handle verification errors
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // 3. Handle the 'checkout.session.completed' event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // 4. Extract the metadata we saved during checkout creation
    const { supporterName, supportMessage, supportedUsername } =
      session.metadata;
    const amount = session.amount_total / 100; // Amount is in cents, convert to dollars

    // 5. Connect to the database
    await dbConnect();

    // 6. Find the creator's profile and add the new supporter to their list
    await Profile.updateOne(
      { username: supportedUsername },
      {
        $push: {
          supporters: {
            name: supporterName,
            message: supportMessage,
            amount: amount,
          },
        },
      }
    );
  }

  // 7. Send a success response back to Stripe
  return NextResponse.json({ received: true });
}
