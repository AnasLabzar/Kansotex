import fs from "fs";
import path from "path";

export interface PromoCodeItem {
  id: string;
  code: string;
  discountPercent: number;
  description: string;
  uses: number;
  isActive: boolean;
  createdAt: string;
}

const DEFAULT_PROMOS: PromoCodeItem[] = [
  {
    id: "promo-hotel30",
    code: "HOTEL30",
    discountPercent: 30,
    description: "Palaces, Hôtels & Riads Partenaires",
    uses: 19,
    isActive: true,
    createdAt: "2026-10-01T10:00:00.000Z"
  },
  {
    id: "promo-archi25",
    code: "ARCHI25",
    discountPercent: 25,
    description: "Architectes & Prescripteurs Certifiés",
    uses: 42,
    isActive: true,
    createdAt: "2026-10-01T10:00:00.000Z"
  },
  {
    id: "promo-kansotex10",
    code: "KANSOTEX10",
    discountPercent: 10,
    description: "Offre Découverte Première Commande",
    uses: 88,
    isActive: true,
    createdAt: "2026-10-01T10:00:00.000Z"
  },
  {
    id: "promo-bienvenue",
    code: "BIENVENUE",
    discountPercent: 10,
    description: "Bienvenue Particuliers & Suites",
    uses: 34,
    isActive: true,
    createdAt: "2026-10-01T10:00:00.000Z"
  },
  {
    id: "promo-welcome",
    code: "WELCOME",
    discountPercent: 10,
    description: "Welcome International Conciergerie",
    uses: 15,
    isActive: true,
    createdAt: "2026-10-01T10:00:00.000Z"
  },
  {
    id: "promo-vip20",
    code: "VIP20",
    discountPercent: 20,
    description: "Cercle Privilège Maison Kansotex",
    uses: 27,
    isActive: true,
    createdAt: "2026-10-01T10:00:00.000Z"
  }
];

function getFilePath(): string {
  return path.join(process.cwd(), "data", "promos.json");
}

export function getAllPromos(): PromoCodeItem[] {
  try {
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(DEFAULT_PROMOS, null, 2), "utf8");
      return DEFAULT_PROMOS;
    }
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data) as PromoCodeItem[];
  } catch (err) {
    console.error("Error reading promos.json:", err);
    return DEFAULT_PROMOS;
  }
}

export function saveAllPromos(promos: PromoCodeItem[]): boolean {
  try {
    const filePath = getFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(promos, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error saving promos.json:", err);
    return false;
  }
}

export function validatePromoCode(rawCode: string): {
  valid: boolean;
  code?: string;
  discountPercent?: number;
  description?: string;
  message: string;
} {
  if (!rawCode) {
    return { valid: false, message: "Veuillez saisir un code promo." };
  }

  const clean = rawCode.trim().toUpperCase();
  const promos = getAllPromos();
  const found = promos.find((p) => p.code.toUpperCase() === clean);

  if (!found) {
    return { valid: false, message: "Code promotionnel invalide ou inexistant." };
  }

  if (!found.isActive) {
    return { valid: false, message: "Ce code promotionnel est actuellement inactif." };
  }

  // Increment usage count
  found.uses = (found.uses || 0) + 1;
  saveAllPromos(promos);

  return {
    valid: true,
    code: found.code,
    discountPercent: found.discountPercent,
    description: found.description,
    message: `-${found.discountPercent}% appliqué avec succès !`,
  };
}

export function createPromoCode(data: {
  code: string;
  discountPercent: number;
  description: string;
}): PromoCodeItem {
  const promos = getAllPromos();
  const cleanCode = data.code.trim().toUpperCase();
  
  // Check if exists
  const existingIndex = promos.findIndex((p) => p.code.toUpperCase() === cleanCode);
  if (existingIndex >= 0) {
    promos[existingIndex].discountPercent = Number(data.discountPercent);
    promos[existingIndex].description = data.description.trim();
    promos[existingIndex].isActive = true;
    saveAllPromos(promos);
    return promos[existingIndex];
  }

  const newPromo: PromoCodeItem = {
    id: `promo-${Date.now()}`,
    code: cleanCode,
    discountPercent: Number(data.discountPercent),
    description: data.description.trim() || `Remise de ${data.discountPercent}%`,
    uses: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  promos.push(newPromo);
  saveAllPromos(promos);
  return newPromo;
}

export function togglePromoStatus(id: string): PromoCodeItem | null {
  const promos = getAllPromos();
  const item = promos.find((p) => p.id === id);
  if (!item) return null;

  item.isActive = !item.isActive;
  saveAllPromos(promos);
  return item;
}

export function deletePromo(id: string): boolean {
  let promos = getAllPromos();
  const initialLength = promos.length;
  promos = promos.filter((p) => p.id !== id);
  if (promos.length !== initialLength) {
    saveAllPromos(promos);
    return true;
  }
  return false;
}
