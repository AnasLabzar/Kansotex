import { db } from "../prisma/db";

async function main() {
  const p1 = await db.orm.public.Product.where({ slug: "drap-bain-nid-abeille" }).first();
  console.log("drap-bain-nid-abeille:", p1?.nameFr);

  const p2 = await db.orm.public.Product.where({ slug: "housse-couette-lin-lave" }).first();
  console.log("housse-couette-lin-lave:", p2?.nameFr);

  const first = await db.orm.public.Product.first();
  console.log("first product in DB:", first?.nameFr);

  // Test with 'where' but maybe 'slug' is not working?
  const all = await db.orm.public.Product.where({ slug: "drap-bain-nid-abeille" }).all();
  console.log("all with slug drap-bain:", all.map(p => p.nameFr));
}

main().catch(console.error);
