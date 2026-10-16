import { NextResponse } from "next/server";
import { generateShieldToken } from "@/lib/antispam";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = generateShieldToken();
    return NextResponse.json({ success: true, token });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
