import 'dotenv/config';
import { db } from "../prisma/db";

const translations = {
  categories: {
    "Linge de Lit": "Bed Linen",
    "Linge de Bain": "Bath Linen",
    "Linge de Table": "Table Linen",
    "Tissus d'Ameublement": "Upholstery Fabrics",
    "Tissus Outdoor": "Outdoor Fabrics",
    "Tapis": "Rugs",
  },
  products: {
    "parure-percale-blanc": {
      nameEn: "WHITE PERCALE BED SET",
      descriptionEn: "High-end 300 thread count percale bed set. Includes one duvet cover and two pillowcases. Breathable and crisp for absolute comfort.",
    },
    "parure-satin-champagne": {
      nameEn: "CHAMPAGNE SATEEN BED SET",
      descriptionEn: "100% cotton sateen bed set in a bright champagne shade. Unmatched softness and elegant drape for a luxurious bedroom.",
    },
    "housse-couette-lin-lave": {
      nameEn: "WASHED LINEN DUVET COVER",
      descriptionEn: "Pure washed linen duvet cover, naturally thermoregulating. Its slightly wrinkled look brings a bohemian chic touch to your interior.",
    },
    "jete-de-lit-texture": {
      nameEn: "TEXTURED BED THROW",
      descriptionEn: "Cotton and linen blend bed throw with geometric textures. Perfect for adding volume and character to your bedding.",
    },
    "peignoir-velours-eponge": {
      nameEn: "TERRY VELOUR BATHROBE",
      descriptionEn: "Premium bathrobe with terry loop interior for absorption and cut velour exterior for softness. Shawl collar design.",
    },
    "set-serviettes-premium": {
      nameEn: "PREMIUM TOWEL SET",
      descriptionEn: "Set of 3 towels (guest, hand, bath) in 600g/m² Egyptian cotton. Maximum absorption and hotel-quality softness.",
    },
    "drap-bain-nid-abeille": {
      nameEn: "WAFFLE WEAVE BATH SHEET",
      descriptionEn: "Modern, lightweight, and highly absorbent design. The waffle weave dries quickly and takes up very little space, making it ideal for the hammam or travel.",
    },
    "nappe-lin-naturel": {
      nameEn: "NATURAL LINEN TABLECLOTH",
      descriptionEn: "Authentic heavy linen tablecloth for elegant and timeless dinners. Available in several sizes for rectangular tables.",
    },
    "nappe-jacquard-antitache": {
      nameEn: "STAIN-RESISTANT JACQUARD TABLECLOTH",
      descriptionEn: "High-quality jacquard weave with invisible stain-resistant treatment. Easy daily care without compromising style.",
    },
    "set-serviettes-table-lin": {
      nameEn: "LINEN TABLE NAPKIN SET",
      descriptionEn: "Set of 6 matching washed linen napkins. Fringed finish for a raw and sophisticated style.",
    },
    "velours-cotele-paris": {
      nameEn: "PARIS CORDUROY VELVET",
      descriptionEn: "Thick and resistant corduroy velvet, ideal for covering sofas and armchairs. Soft to the touch and very durable.",
    },
    "lin-lave-outdoor-capri": {
      nameEn: "CAPRI OUTDOOR WASHED LINEN",
      descriptionEn: "Linen specially treated for outdoor use. Water-repellent, UV-resistant, and mold-resistant for your terraces and pools.",
    },
    "bouclette-alpes": {
      nameEn: "ALPS BOUCLÉ FABRIC",
      descriptionEn: "Trendy curly bouclé fabric for cozy armchairs and cushions. 3D texture and enveloping softness.",
    },
    "jacquard-atlas": {
      nameEn: "ATLAS JACQUARD",
      descriptionEn: "Heavy jacquard fabric with geometric patterns inspired by Moroccan craftsmanship. Perfect for curtains and heavy seating.",
    },
    "tapis-beni-ouarain": {
      nameEn: "BENI OUARAIN RUG",
      descriptionEn: "Authentic Moroccan rug hand-woven in the Middle Atlas. 100% natural virgin wool with traditional geometric patterns.",
    }
  }
};

async function main() {
  await db.connect({ url: process.env.DATABASE_URL! });
  console.log("Starting Database Translation...");
  
  // 1. Translate Categories
  const categories = await db.orm.public.Category.all();
  for (const cat of categories) {
    const categoriesMap = translations.categories as Record<string, string>;
    if (categoriesMap[cat.nameFr]) {
      await db.orm.public.Category.where({ id: cat.id }).update({ nameEn: categoriesMap[cat.nameFr] });
      console.log(`Translated Category: ${cat.nameFr} -> ${categoriesMap[cat.nameFr]}`);
    }
  }

  // 2. Translate Products
  const products = await db.orm.public.Product.all();
  for (const prod of products) {
    const productsMap = translations.products as Record<string, { nameEn: string, descriptionEn: string }>;
    if (productsMap[prod.slug]) {
      const enData = productsMap[prod.slug];
      await db.orm.public.Product.where({ id: prod.id }).update({ 
        nameEn: enData.nameEn,
        descriptionEn: enData.descriptionEn
      });
      console.log(`Translated Product: ${prod.slug}`);
    } else {
      // Fallback cleanup if not specifically listed
      await db.orm.public.Product.where({ id: prod.id }).update({
        nameEn: prod.nameFr.replace(" (EN)", ""),
        descriptionEn: prod.descriptionFr ? prod.descriptionFr.replace(" (EN)", "") : ""
      });
    }
  }

  console.log("Translations successfully applied to the database!");
  await db.close();
}

main().catch(async (e) => {
  console.error(e);
  await db.close();
});
