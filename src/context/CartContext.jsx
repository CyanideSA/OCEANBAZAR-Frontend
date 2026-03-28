import React, { createContext, useContext, useState, useCallback } from "react";
import { cartAPI } from "@/api/service";
import { useToast } from "@/hooks/use-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("oceanBazarToken");
    if (!token) return;
    setLoading(true);
    try {
      const response = await cartAPI.get();
      const backendCart = response.data;
      if (backendCart.items) {
        setItems(backendCart.items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.price ?? item.product.price,
          retailPrice: item.product.retailPrice ?? item.product.price,
          wholesalePrice: item.product.wholesalePrice ?? item.product.price,
          quantity: item.quantity,
          image: item.product.image,
          supplier: item.product.supplier,
          moq: item.product.moq,
          rating: item.product.rating,
          category: item.product.category
        })));
      }
    } catch (error) {
      if (error.response?.status === 401) setItems([]);
    }
    setLoading(false);
  }, []);

  const addToCart = useCallback(async (product) => {
    const token = localStorage.getItem("oceanBazarToken");
    const productId = product?.id || product?._id;
    if (!productId) return;

    if (!token) {
      setItems(prev => {
        const existing = prev.find(item => item.id === productId);
        if (existing) return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item);
        return [...prev, { ...product, id: productId, quantity: product.quantity || 1 }];
      });
    } else {
      try {
        await cartAPI.add({ productId, quantity: product.quantity || 1 });
        await fetchCart();
      } catch (error) {
        toast({ title: "Add to cart failed", description: error?.response?.data?.detail || "Please try again.", variant: "destructive" });
      }
    }
  }, [fetchCart, toast]);

  const updateQuantity = useCallback(async (productId, newQuantity) => {
    const token = localStorage.getItem("oceanBazarToken");
    if (!token) {
      setItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    } else {
      try {
        await cartAPI.update({ productId, quantity: newQuantity });
        await fetchCart();
      } catch (error) {
        toast({ title: "Update failed", variant: "destructive" });
      }
    }
  }, [fetchCart, toast]);

  const removeFromCart = useCallback(async (productId) => {
    const token = localStorage.getItem("oceanBazarToken");
    if (!token) {
      setItems(prev => prev.filter(item => item.id !== productId));
    } else {
      try {
        await cartAPI.remove(productId);
        await fetchCart();
      } catch (error) {
        toast({ title: "Remove failed", variant: "destructive" });
      }
    }
  }, [fetchCart, toast]);

  const clearCart = useCallback(() => setItems([]), []);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, loading, cartCount, fetchCart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
