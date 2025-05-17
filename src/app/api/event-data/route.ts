// /app/api/events/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    // You can replace this with actual Mongoose model queries
    return NextResponse.json({ message: "Connected to MongoDB successfully", });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to connect to database" }, { status: 500 });
  }
}
