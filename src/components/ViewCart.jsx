import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";

function ViewCart() {
	const { cart, total } = useCart();
	const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<Link to="/cart" className="flex items-center gap-2 relative">
			<GiShoppingCart size={26}/>
			{/* Badge */}
			{itemsCount > 0 && (
				<span className="absolute -top-2 -right-2 bg-red-500 text-white font-semibold text-xs px-1 rounded-full">
					{itemsCount}
				</span>
			)}
			{/* Total */}
			<span className="text-green-600 dark:text-green-400 font-semibold">
				${total}
			</span>
		</Link>
	);
}

export default ViewCart;