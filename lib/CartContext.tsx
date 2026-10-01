"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  id: string; // Unique ID for the cart line (could be variantId + dyeLotId)
  productId: string;
  variantId: string;
  name: string;
  colorName: string;
  colorHex?: string;
  price: number;
  quantity: number;
  isFabric: boolean;
  image?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("kansotex_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart");
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("kansotex_cart", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      // Check if item already exists (same variant)
      const existingItemIndex = currentItems.findIndex(i => i.id === newItem.id);
      
      if (existingItemIndex > -1) {
        // Update quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      
      // Add new item
      return [...currentItems, newItem];
    });
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = items.reduce((count, item) => count + (item.isFabric ? 1 : item.quantity), 0); // For fabrics, count as 1 item line. For others, count quantity. Or just count items.length. We'll use items.length for unique lines.

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        cartTotal,
        cartCount: items.length, // Number of distinct products/lines
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
