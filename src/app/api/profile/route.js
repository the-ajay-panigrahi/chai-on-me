import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js";
import dbConnect from "@/db/db";
import Profile from "@/models/profile.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const email = session.user.email;
  const profile = await Profile.findOne({ email });
  return NextResponse.json(profile || {});
}

export async function POST(request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const email = session.user.email;
    const data = await request.json();

    const updatedProfile = await Profile.findOneAndUpdate(
      { email: email },
      { ...data, email: email },
      { new: true, upsert: true } // upsert: true creates the document if it doesn't exist
    );

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("ERROR SAVING PROFILE:", error); 
    return NextResponse.json(
      { error: "Failed to save profile." },
      { status: 500 }
    );
  }
}
