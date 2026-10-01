import 'dotenv/config';
import { db } from './db';
import { fakeCategories, fakeProducts } from './fakeData';

async function main() {
  console.log('🌱 Starting Seed Process...');
  
  console.log('Wiping existing data...');
  const runtime = db.runtime();
  await runtime.execute(db.sql.public.DyeLot.delete().build());
  await runtime.execute(db.sql.public.ProductVariant.delete().build());
  await runtime.execute(db.sql.public.ProductMetadata.delete().build());
  await runtime.execute(db.sql.public.Product.delete().build());
  await runtime.execute(db.sql.public.Category.delete().build());

  // 1. Insert Categories
  console.log('Inserting Categories...');
  for (const cat of fakeCategories) {
    await db.orm.public.Category.create(cat);
  }

  // 2. Insert Products, Metadata, Variants, and DyeLots
  console.log('Inserting Products & Variants...');
  for (const prodData of fakeProducts) {
    const { metadata, variants, ...productBase } = prodData;
    
    // Create Product
    const product = await db.orm.public.Product.create({
      ...productBase,
      type: productBase.type as any,
    });

    // Handle Metadata
    if (metadata) {
      const { id: metaId, ...metaFields } = metadata;
      
      await db.orm.public.ProductMetadata.create({
        ...metaFields,
        id: metaId || crypto.randomUUID(),
        productId: product.id,
      });
    }

    // Handle Variants and DyeLots
    for (const variantData of variants) {
      const { dyeLots, ...variantBase } = variantData;

      const variant = await db.orm.public.ProductVariant.create({
        ...variantBase, 
        productId: product.id 
      });

      // Handle DyeLots
      for (const lot of dyeLots) {

        await db.orm.public.DyeLot.create({
          variantId: variant.id,
          lotNumber: lot.lotNumber,
          stockLength: lot.stockLength,
        });
      }
    }
  }

  console.log('✅ Seed Complete!');
  
  // Script needs to close the connection to exit
  await db.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
