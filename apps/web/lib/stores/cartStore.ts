/**
 * Shopping Cart Store
 * 
 * Global cart state using Zustand with persistence.
 * Handles cart items, quantities, and cart calculations.
 */

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { CartItem } from '@/types/models';

interface CartState {
    // State
    items: CartItem[];

    // Actions
    addItem: (item: CartItem) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;

    // Selectors
    getItemCount: () => number;
    getTotalPrice: () => number;
    getItemById: (itemId: string) => CartItem | undefined;
    hasItems: () => boolean;

    // Grouped by seller (for checkout)
    getItemsBySeller: () => Map<string, CartItem[]>;
}

export const useCartStore = create<CartState>()(
    devtools(
        persist(
            immer((set, get) => ({
                // Initial state
                items: [],

                // Actions
                addItem: (item) => set((state) => {
                    const existingIndex = state.items.findIndex(
                        (i) => i.id === item.id
                    );

                    if (existingIndex >= 0) {
                        // Item exists, increment quantity
                        state.items[existingIndex]!.quantity += item.quantity;
                    } else {
                        // New item
                        state.items.push(item);
                    }
                }),

                removeItem: (itemId) => set((state) => {
                    state.items = state.items.filter((item) => item.id !== itemId);
                }),

                updateQuantity: (itemId, quantity) => set((state) => {
                    const item = state.items.find((i) => i.id === itemId);
                    if (item) {
                        if (quantity <= 0) {
                            // Remove if quantity is 0 or negative
                            state.items = state.items.filter((i) => i.id !== itemId);
                        } else {
                            item.quantity = quantity;
                        }
                    }
                }),

                clearCart: () => set({ items: [] }),

                // Selectors
                getItemCount: () => {
                    return get().items.reduce((total, item) => total + item.quantity, 0);
                },

                getTotalPrice: () => {
                    return get().items.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                    );
                },

                getItemById: (itemId) => {
                    return get().items.find((item) => item.id === itemId);
                },

                hasItems: () => {
                    return get().items.length > 0;
                },

                getItemsBySeller: () => {
                    const items = get().items;
                    const grouped = new Map<string, CartItem[]>();

                    items.forEach((item) => {
                        const sellerItems = grouped.get(item.sellerId) || [];
                        sellerItems.push(item);
                        grouped.set(item.sellerId, sellerItems);
                    });

                    return grouped;
                },
            })),
            {
                name: 'cart-storage',
                // Only persist items
                partialize: (state) => ({ items: state.items }),
            }
        ),
        { name: 'CartStore' }
    )
);

/**
 * Selector hooks for performance
 */
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartItemCount = () => useCartStore((state) => state.getItemCount());
export const useCartTotalPrice = () => useCartStore((state) => state.getTotalPrice());
export const useHasCartItems = () => useCartStore((state) => state.hasItems());
export const useAddToCart = () => useCartStore((state) => state.addItem);
export const useRemoveFromCart = () => useCartStore((state) => state.removeItem);
export const useUpdateCartQuantity = () => useCartStore((state) => state.updateQuantity);
export const useClearCart = () => useCartStore((state) => state.clearCart);
