import { db } from "../prisma/db";

async function main() {
  const users = await db.orm.public.User.all();
  console.log("USERS COUNT:", users.length);
  console.log("USERS:", JSON.stringify(users, null, 2));
}

main().catch(console.error);
