import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

interface CartItem {
    id?: string; // Unique ID for cart entry
    serviceId: string;
    name: string;
    indicativePrice: number;
    quantity: number;
    unit: string;
    fabricType?: string;
    colorDetails?: string;
    urgency?: string;
    notes: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    cartTotalConfig: number; // Item count
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        const total = items.reduce((sum, item) => sum + (item.indicativePrice * item.quantity), 0);
        setTotalPrice(total);
    }, [items]);

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
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartTotalConfig: items.length, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
