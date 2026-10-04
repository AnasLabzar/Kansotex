import { db } from "@/prisma/db";
import { getSession } from "@/lib/session";
import { PopularProductsCarousel } from "./PopularProductsCarousel";

export async function PopularProducts() {
  return (
    <div style={{ padding: "2rem", backgroundColor: "black", color: "white", zIndex: 9999, position: "relative", textAlign: "center" }}>
      <h2>POPULAR PRODUCTS PLACEHOLDER</h2>
      <p>If you see this, the error is fixed.</p>
    </div>
  );
}


