import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
    serviceId: string;
    name: string;
    indicativePrice: number;
    quantity: number; // weight in kg
    notes: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (serviceId: string) => void;
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
        // Check if exists
        const existing = items.find(i => i.serviceId === item.serviceId);
        let newItems;
        if (existing) {
            newItems = items.map(i => i.serviceId === item.serviceId ? { ...i, quantity: i.quantity + item.quantity } : i);
        } else {
            newItems = [...items, item];
        }
        saveCart(newItems);
    };

    const removeFromCart = (serviceId: string) => {
        const newItems = items.filter(i => i.serviceId !== serviceId);
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
