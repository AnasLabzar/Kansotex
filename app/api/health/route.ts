import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const diagnostics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    env: {
      DATABASE_URL_SET: !!process.env.DATABASE_URL,
      DATABASE_URL_PREFIX: process.env.DATABASE_URL?.substring(0, 30) || "MISSING",
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  // Test 1: Can we import temporal-polyfill?
  try {
    await import("temporal-polyfill/full/global");
    diagnostics.temporalPolyfill = "OK";
  } catch (e: any) {
    diagnostics.temporalPolyfill = `FAILED: ${e.message}`;
  }

  // Test 2: Can we import @prisma/orm-postgres/runtime?
  try {
    const mod = await import("@prisma/orm-postgres/runtime");
    diagnostics.prismaRuntime = `OK (keys: ${Object.keys(mod).join(", ")})`;
  } catch (e: any) {
    diagnostics.prismaRuntime = `FAILED: ${e.message}`;
  }

  // Test 3: Can we import the contract JSON?
  try {
    const contract = await import("@/prisma/schema.json");
    diagnostics.contractJson = `OK (keys: ${Object.keys(contract).length})`;
  } catch (e: any) {
    diagnostics.contractJson = `FAILED: ${e.message}`;
  }

  // Test 4: Can we create a db instance and query?
  try {
    const { db } = await import("@/prisma/db");
    const products = await db.orm.public.Product.all();
    diagnostics.dbQuery = `OK (${products.length} products)`;
  } catch (e: any) {
    diagnostics.dbQuery = `FAILED: ${e.message}\n${e.stack}`;
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
