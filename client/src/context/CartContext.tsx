import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

interface CartItem {
    id?: string; // Unique ID for cart entry
    serviceId: string;
    name: string;
    indicativePrice: number;
    quantity: number;
    unit: string;
    fabricType?: string; // Cotton, Polyester etc. specific type
    colorDetails?: string;
    urgency?: string;
    notes: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    cartTotalConfig: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) setItems(JSON.parse(saved));
    }, []);

    const saveCart = (newItems: CartItem[]) => {
        setItems(newItems);
        localStorage.setItem('cart', JSON.stringify(newItems));
    };

    const addToCart = (item: CartItem) => {
        // Generate a random ID for the cart item to allow duplicates of same service with different specs
        const cartItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
        const newItems = [...items, cartItem];
        saveCart(newItems);
    };

    const removeFromCart = (itemId: string) => {
        const newItems = items.filter(i => i.id !== itemId);
        saveCart(newItems);
    };

    const clearCart = () => {
        saveCart([]);
    };

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartTotalConfig: items.length }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
