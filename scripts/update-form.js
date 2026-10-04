const fs = require('fs');
let c = fs.readFileSync('app/[locale]/products/[slug]/AddToCartForm.tsx', 'utf8');

c = c.replace(
  /import \{ formatPrice \} from "@\/lib\/currency";/,
  'import { formatPrice } from "@/lib/currency";\nimport { useTranslations } from "next-intl";'
);

c = c.replace(
  /const \{ addItem, setIsOpen \} = useCart\(\);/,
  'const t = useTranslations("Products");\n  const { addItem, setIsOpen } = useCart();'
);

c = c.replace(/COULEUR/g, 'Couleur');
c = c.replace(/DISPONIBILITE/g, '{t("availability")}');
c = c.replace(/en stock/g, '{t("inStock")}');
c = c.replace(/AJOUTER AU PANIER/g, '{t("addToCart")}');

fs.writeFileSync('app/[locale]/products/[slug]/AddToCartForm.tsx', c);
