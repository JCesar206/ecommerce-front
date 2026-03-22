import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem("cart")) || [];
		} catch {
			return [];
		}
	});
	
	const clearCart = () => setCart([]);

	// Persistencia
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	// Agregar
	const addToCart = (product) => {
		setCart((prev) => {
			const exist = prev.find((p) => p.id === product.id);

			if (exist) {
				return prev.map((p) => p.id === product.id ? {...p, quantity: p.quantity + 1} : p);
			}
			return [...prev, {...product, quantity: 1 }];
		});
	};

	// Quitar
	const removeFromCart = (id) => {
		setCart((prev) => prev.filter((p) => p.id !== id));
	};

	// Cambiar cantidad
	const updateQuantity = (id, qty) => {
		if (qty < 1) return;

		setCart((prev) => prev.map((p) => p.id === id ? {...p, quantity: qty } : p));
	};

	// Total
	const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, updateQuantity, total, clearCart }}>
				{children}
			</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);