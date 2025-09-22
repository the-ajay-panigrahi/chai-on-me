import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/db/db";
import Profile from "@/models/profile.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Get the unique payment ID from the session
    const paymentId = session.id;

    await dbConnect();

    // CHECK FOR DUPLICATE: See if a supporter with this paymentId already exists
    const existingSupporter = await Profile.findOne({
      "supporters.paymentId": paymentId,
    });

    if (existingSupporter) {
      console.log("✅ Supporter already exists for payment ID:", paymentId);
      // If they exist, do nothing. Just send a success response to Stripe.
      return NextResponse.json({ received: true });
    }

    // If no duplicate is found, proceed with adding the new supporter
    const { supporterName, supportMessage, supportedUsername } =
      session.metadata;
    const amount = session.amount_total / 100;

    console.log("➕ Adding new supporter for payment ID:", paymentId);

    await Profile.updateOne(
      { username: supportedUsername },
      {
        $push: {
          supporters: {
            name: supporterName,
            message: supportMessage,
            amount: amount,
            paymentId: paymentId, // Save the unique payment ID
          },
        },
      }
    );
  }

  return NextResponse.json({ received: true });
}
