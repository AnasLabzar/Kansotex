import { brand } from "@/lib/content";

export interface ProductSchemaData {
  id: string;
  slug: string;
  nameFr: string;
  nameEn?: string | null;
  descriptionFr?: string | null;
  descriptionEn?: string | null;
  type: "FABRIC_BY_METER" | "FINISHED_GOOD" | "SAMPLE" | string;
  basePrice: number;
  image?: string | null;
  gallery?: string[] | null;
  categoryId?: string;
  category?: {
    id?: string;
    slug?: string;
    nameFr?: string;
    nameEn?: string | null;
    descriptionFr?: string | null;
    descriptionEn?: string | null;
  } | null;
  metadata?: {
    id?: string;
    laize?: number | null;
    raccordV?: number | null;
    raccordH?: number | null;
    isHalfDrop?: boolean | null;
    martindale?: number | null;
    weight?: number | null;
    composition?: string | null;
    minOrderLength?: number | null;
    cutIncrement?: number | null;
  } | null;
  variants?: Array<{
    id: string;
    sku: string;
    colorNameFr?: string | null;
    colorNameEn?: string | null;
    colorHex?: string | null;
    size?: string | null;
    stockLevel?: number | null;
    dyeLots?: Array<{
      id?: string;
      lotNumber: string;
      stockLength: number;
      isExhausted?: boolean;
    }> | null;
  }> | null;
}

export interface BuildProductJsonLdOptions {
  product: ProductSchemaData;
  finalPrice?: number;
  locale?: string;
  baseUrl?: string;
}

/**
 * Normalizes any relative or absolute image path to a full public URL
 */
function toAbsoluteUrl(path: string | null | undefined, baseUrl: string): string {
  if (!path) return `${baseUrl}/KANSOTEX-marque-Black.png`;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generates an advanced, rich Schema.org JSON-LD graph combining Product,
 * Detailed Offers with Shipping & Return policies, Variant breakdowns,
 * Textile Technical PropertyValues, and BreadcrumbList.
 * 
 * Complies with Google Rich Results, Google Merchant Center, and
 * Generative Engine Optimization (GEO / AI Shopping agents).
 */
export function buildProductJsonLd({
  product,
  finalPrice,
  locale = "fr",
  baseUrl = "https://kansotex.com",
}: BuildProductJsonLdOptions) {
  const isEn = locale === "en";
  const productName = (isEn ? product.nameEn || product.nameFr : product.nameFr) || "Produit Kansotex";
  const productDescription =
    (isEn ? product.descriptionEn || product.descriptionFr : product.descriptionFr) ||
    `${productName} - Étoffe et confection d'exception par Kansotex Marrakech.`;

  const categoryName = product.category
    ? (isEn ? product.category.nameEn || product.category.nameFr : product.category.nameFr)
    : isEn
    ? "Textiles & Living"
    : "Textiles d'ameublement & Linge";
  
  const categorySlug = product.category?.slug || "";

  const productUrl = `${baseUrl}/${locale}/products/${product.slug}`;
  const effectivePrice = Number((finalPrice !== undefined && finalPrice > 0 ? finalPrice : product.basePrice).toFixed(2));
  
  // Clean all image URLs
  const rawImages: string[] = [];
  if (product.image) rawImages.push(product.image);
  if (Array.isArray(product.gallery)) {
    for (const g of product.gallery) {
      if (g && !rawImages.includes(g)) rawImages.push(g);
    }
  }
  if (rawImages.length === 0) {
    rawImages.push("/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png");
  }
  const images = rawImages.map((img) => toAbsoluteUrl(img, baseUrl));

  // Determine stock availability across variants
  const variants = Array.isArray(product.variants) && product.variants.length > 0 ? product.variants : [];
  
  const checkVariantStock = (v: typeof variants[0]): boolean => {
    if (v.dyeLots && v.dyeLots.length > 0) {
      const activeLength = v.dyeLots
        .filter((d) => !d.isExhausted)
        .reduce((sum, d) => sum + (Number(d.stockLength) || 0), 0);
      return activeLength > 0;
    }
    if (v.stockLevel !== undefined && v.stockLevel !== null) {
      return Number(v.stockLevel) > 0;
    }
    return true; // Default available if no tracking constraint
  };

  const isAnyVariantInStock = variants.length > 0 ? variants.some(checkVariantStock) : true;
  const isFabric = product.type === "FABRIC_BY_METER";

  // Shared return policy
  const merchantReturnPolicy = {
    "@type": "MerchantReturnPolicy",
    "@id": `${baseUrl}/#merchant-return-policy`,
    applicableCountry: "MA",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 14,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
    refundType: "https://schema.org/FullRefund",
    returnPolicyCountry: "MA",
  };

  // Shared shipping details
  const shippingDetails = {
    "@type": "OfferShippingDetails",
    "@id": `${baseUrl}/#shipping-details-maroc`,
    shippingRate: {
      "@type": "MonetaryAmount",
      value: "0.00",
      currency: "MAD",
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "MA",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 2,
        unitCode: "d",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 3,
        unitCode: "d",
      },
    },
  };

  // Shared seller / manufacturer organization
  const sellerOrganization = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: brand.legalName || "Kanso Business SARL",
    legalName: brand.legalName || "Kanso Business SARL",
    url: baseUrl,
    logo: `${baseUrl}/KANSOTEX-marque-Black.png`,
    telephone: brand.phoneGenerale || "+212 5 24 20 09 96",
    email: brand.email || "contact@kansotex.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.address || "983 Al Massar, Rte de Safi",
      addressLocality: brand.city || "Marrakech",
      postalCode: "40100",
      addressCountry: "MA",
    },
  };

  // Build Offer items for each variant (or 1 root offer)
  const offersList = variants.length > 0
    ? variants.map((v, index) => {
        const variantStock = checkVariantStock(v);
        const variantName = (isEn ? v.colorNameEn || v.colorNameFr : v.colorNameFr) || v.size || `Option ${index + 1}`;
        return {
          "@type": "Offer",
          "@id": `${productUrl}#offer-${v.sku || index}`,
          url: productUrl,
          name: `${productName} — ${variantName}`,
          sku: v.sku || `${product.slug}-${index}`,
          priceCurrency: "MAD",
          price: effectivePrice,
          priceValidUntil: "2027-12-31",
          itemCondition: "https://schema.org/NewCondition",
          availability: variantStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          businessFunction: "https://schema.org/Sell",
          seller: sellerOrganization,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: effectivePrice,
            priceCurrency: "MAD",
            unitCode: isFabric ? "MTR" : "C62",
            unitText: isFabric
              ? isEn ? "linear meter" : "mètre linéaire"
              : isEn ? "piece" : "pièce",
            referenceQuantity: isFabric
              ? {
                  "@type": "QuantitativeValue",
                  value: "1",
                  unitCode: "MTR",
                }
              : undefined,
          },
          shippingDetails,
          hasMerchantReturnPolicy: merchantReturnPolicy,
        };
      })
    : [
        {
          "@type": "Offer",
          "@id": `${productUrl}#offer-default`,
          url: productUrl,
          name: productName,
          sku: product.slug,
          priceCurrency: "MAD",
          price: effectivePrice,
          priceValidUntil: "2027-12-31",
          itemCondition: "https://schema.org/NewCondition",
          availability: isAnyVariantInStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          businessFunction: "https://schema.org/Sell",
          seller: sellerOrganization,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: effectivePrice,
            priceCurrency: "MAD",
            unitCode: isFabric ? "MTR" : "C62",
            unitText: isFabric
              ? isEn ? "linear meter" : "mètre linéaire"
              : isEn ? "piece" : "pièce",
            referenceQuantity: isFabric
              ? {
                  "@type": "QuantitativeValue",
                  value: "1",
                  unitCode: "MTR",
                }
              : undefined,
          },
          shippingDetails,
          hasMerchantReturnPolicy: merchantReturnPolicy,
        },
      ];

  // Dynamic textile technical specs (additionalProperty)
  const additionalProperties: Array<{
    "@type": "PropertyValue";
    name: string;
    value: string | number;
    description?: string;
  }> = [];

  const meta = product.metadata;

  if (meta?.martindale) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: isEn ? "Martindale Abrasion Resistance" : "Résistance à l'abrasion (Martindale)",
      value: `${meta.martindale.toLocaleString(isEn ? "en-US" : "fr-FR")} ${isEn ? "cycles" : "tours"}`,
      description: isEn
        ? "Commercial heavy-use abrasion test standard for luxury hospitality & upholstery"
        : "Test d'abrasion certifié pour usage intensif, résidences et hôtellerie",
    });
  }

  if (meta?.laize) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: isEn ? "Roll Width (Laize)" : "Largeur utile du rouleau (Laize)",
      value: `${meta.laize} cm`,
      description: isEn ? "Usable roll width in centimeters" : "Largeur utile en centimètres",
    });
  }

  if (meta?.weight) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: isEn ? "Fabric Weight / Density" : "Poids / Densité textile (Grammage)",
      value: `${meta.weight} g/m²`,
      description: isEn ? "Grams per square meter (GSM)" : "Grammes par mètre carré",
    });
  }

  if (meta?.composition) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: isEn ? "Certified Textile Composition" : "Composition textile certifiée",
      value: meta.composition,
    });
  }

  if (meta?.raccordV !== undefined && meta?.raccordV !== null) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: isEn ? "Vertical Pattern Repeat" : "Raccord Vertical",
      value: meta.raccordV > 0 ? `${meta.raccordV} cm` : isEn ? "Free repeat / Plain" : "Raccord libre / Uni",
    });
  }

  if (meta?.raccordH !== undefined && meta?.raccordH !== null) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: isEn ? "Horizontal Pattern Repeat" : "Raccord Horizontal",
      value: meta.raccordH > 0 ? `${meta.raccordH} cm` : isEn ? "Free repeat / Plain" : "Sans raccord horizontal",
    });
  }

  if (meta?.isHalfDrop !== undefined && meta?.isHalfDrop !== null) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: isEn ? "Repeat Alignment" : "Type d'alignement du motif",
      value: meta.isHalfDrop
        ? isEn ? "Half-drop repeat" : "Raccord sauté (Half-drop)"
        : isEn ? "Straight match" : "Raccord droit",
    });
  }

  if (meta?.minOrderLength) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: isEn ? "Minimum Order Quantity" : "Quantité minimale de commande",
      value: `${meta.minOrderLength} ${isEn ? "meter" : "mètre"}`,
    });
  }

  if (meta?.cutIncrement) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: isEn ? "Custom Cut Increment" : "Pas de coupe sur-mesure",
      value: `${meta.cutIncrement} m`,
    });
  }

  // Additional brand craftsmanship properties
  additionalProperties.push(
    {
      "@type": "PropertyValue",
      name: isEn ? "Sale Unit Format" : "Mode de commercialisation",
      value: isFabric
        ? isEn ? "By linear meter with custom cutting" : "Au mètre linéaire avec découpe sur-mesure"
        : isEn ? "Finished good per piece" : "Produit confectionné à la pièce",
    },
    {
      "@type": "PropertyValue",
      name: isEn ? "Atelier & Manufacture Origin" : "Manufacture & Savoir-faire",
      value: "Marrakech, Maroc — Kanso Business SARL / Kansotex",
      description: isEn
        ? "Authentic Moroccan craftsmanship with European luxury hospitality standards"
        : "Manufacture marocaine d'excellence selon les normes hôtelières internationales",
    },
    {
      "@type": "PropertyValue",
      name: isEn ? "Intended Audience & Use" : "Usage & Destination",
      value: isEn
        ? "Luxury Hotels, Riads, Interior Architects, Upholsterers & Discerning Residences"
        : "Hôtellerie de luxe, Riads, Architectes d'intérieur, Tapissiers décorateurs et Particuliers exigeants",
    }
  );

  // If dye lots exist across variants, note color consistency batch tracking
  const hasDyeLots = variants.some((v) => v.dyeLots && v.dyeLots.length > 0);
  if (hasDyeLots) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: isEn ? "Dye Lot Traceability" : "Traçabilité des Bains de Teinture (Dye Lots)",
      value: isEn
        ? "Batch color consistency inspection per dye lot"
        : "Garantie d'homogénéité chromatique par suivi rigoureux des bains de teinture",
    });
  }

  // Colors and sizes arrays
  const colors = Array.from(
    new Set(
      variants
        .map((v) => (isEn ? v.colorNameEn || v.colorNameFr : v.colorNameFr))
        .filter((c): c is string => Boolean(c && c.trim()))
    )
  );

  const sizes = Array.from(
    new Set(
      variants
        .map((v) => v.size)
        .filter((s): s is string => Boolean(s && s.trim()))
    )
  );

  // Sub-variants as Product models for AI & Google Product Grouping
  const hasVariant = variants.length > 1
    ? variants.map((v, i) => {
        const varName = (isEn ? v.colorNameEn || v.colorNameFr : v.colorNameFr) || v.size || `Variante ${i + 1}`;
        const varStock = checkVariantStock(v);
        return {
          "@type": "Product",
          "@id": `${productUrl}#variant-${v.sku || i}`,
          name: `${productName} — ${varName}`,
          sku: v.sku || `${product.slug}-${i}`,
          color: (isEn ? v.colorNameEn || v.colorNameFr : v.colorNameFr) || undefined,
          size: v.size || undefined,
          image: images[0],
          offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "MAD",
            price: effectivePrice,
            availability: varStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: sellerOrganization,
          },
        };
      })
    : undefined;

  // Primary BreadcrumbList schema
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${productUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEn ? "Home" : "Accueil",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEn ? "Collections" : "Collections",
        item: `${baseUrl}/${locale}/products`,
      },
      ...(categorySlug
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: categoryName,
              item: `${baseUrl}/${locale}/products?category=${categorySlug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: categorySlug ? 4 : 3,
        name: productName,
        item: productUrl,
      },
    ],
  };

  // Primary Product Schema
  const productSchema = {
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: productName,
    description: productDescription,
    url: productUrl,
    image: images,
    sku: variants[0]?.sku || product.slug,
    mpn: (product.slug || "").toUpperCase(),
    productID: product.id,
    category: categoryName,
    brand: {
      "@type": "Brand",
      name: "Kansotex",
      legalName: brand.legalName || "Kanso Business SARL",
      url: baseUrl,
      logo: `${baseUrl}/KANSOTEX-marque-Black.png`,
    },
    manufacturer: sellerOrganization,
    material: meta?.composition || undefined,
    pattern:
      meta?.raccordV || meta?.raccordH
        ? isEn ? "Pattern with repeat" : "Motif à raccord"
        : isEn ? "Plain / Solid texture" : "Uni / Texturé",
    color: colors.length > 0 ? (colors.length === 1 ? colors[0] : colors) : undefined,
    size: sizes.length > 0 ? (sizes.length === 1 ? sizes[0] : sizes) : undefined,
    weight: meta?.weight
      ? {
          "@type": "QuantitativeValue",
          value: meta.weight,
          unitCode: "g/m²",
          unitText: isEn ? "grams per square meter (GSM)" : "grammes par mètre carré",
        }
      : undefined,
    width: meta?.laize
      ? {
          "@type": "QuantitativeValue",
          value: meta.laize,
          unitCode: "CMT",
          unitText: isEn ? "centimeters (usable roll width)" : "centimètres (laize utile)",
        }
      : undefined,
    audience: {
      "@type": "Audience",
      audienceType: isEn
        ? "Luxury Hospitality, Riads, Interior Architects, Upholsterers & Demanding Homes"
        : "Hôtellerie de luxe, Riads, Architectes d'intérieur, Tapissiers et Résidences de prestige",
    },
    additionalProperty: additionalProperties.length > 0 ? additionalProperties : undefined,
    offers: offersList.length === 1 ? offersList[0] : offersList,
    hasVariant,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, productSchema],
  };
}
