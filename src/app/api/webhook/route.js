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
    const paymentId = session.id;
    const { supporterName, supportMessage, supportedUsername } =
      session.metadata;
    const amount = session.amount_total / 100;

    await dbConnect();
    const result = await Profile.findOneAndUpdate(
      {
        username: supportedUsername,
        "supporters.paymentId": { $ne: paymentId },
      },
      {
        $push: {
          supporters: {
            name: supporterName,
            message: supportMessage,
            amount: amount,
            paymentId: paymentId,
          },
        },
      },
      { new: true }
    );

    if (result) {
      console.log(
        "✅ New supporter added successfully for payment ID:",
        paymentId
      );
    } else {
      console.log("Duplicate payment event ignored for payment ID:", paymentId);
    }
  }

  return NextResponse.json({ received: true });
}
