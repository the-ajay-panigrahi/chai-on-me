import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/db/db";
import Profile from "@/models/profile.model";

export async function POST(request) {
  try {
    const { amount, name, message, username } = await request.json();

    await dbConnect();
    const userProfile = await Profile.findOne({ username });

    if (!userProfile || !userProfile.stripeSecret) {
      return NextResponse.json(
        { error: "Creator has not set up payments." },
        { status: 404 }
      );
    }

    // Initialize Stripe with the creator's secret key
    const stripe = new Stripe(userProfile.stripeSecret);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Support for @${username}`,
              description: `A kind donation from ${name || "Anonymous"}`,
            },
            unit_amount: Math.round(amount * 100), // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        supporterName: name,
        supportMessage: message,
        supportedUsername: username,
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/${username}?payment_success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/${username}`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: "Could not create payment session" },
      { status: 500 }
    );
  }
}
