import { useEffect, useState } from "react";
import API from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { IoMdAdd } from "react-icons/io";

function Products() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const { addToCart } = useCart();
	const { t } = useLanguage();

	const getProducts = async () => {
		try {
			const res = await API.get("/products");
			setProducts(res.data);
		} catch (err) {
			console.error("Error cargando productos:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	if (loading) {
		return <p className="text-center mt-10">{t("downloadProducts")}</p>;
	}

	return (
		<>
		<Navbar/>
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">{t("products")}</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{products.map((product) => (
						<div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-4">
							<img src={product.image 
							? `http://localhost:4000/uploads/${product.image}` 
							: "https://via.placeholder.com/200"}
							alt={product.name}
							className="w-full h-40 object-cover rounded mb-3"/>
							<h2 className="font-semibold text-lg">{product.name}</h2>

							<p className="text-gray-500 text-sm mb-2">{product.description}</p>
							<p className="font-bold text-blue-500">${product.price}</p>
							
							<div className="flex gap-4">
							<button onClick={() => addToCart(product)}
							className="w-full flex items-center justify-center gap-2 px-4 py-2
							bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 text-white font-bold rounde-lg shadow-lg hover:scale-105 transition-transform cursor-pointer rounded-full"><IoMdAdd className="text-lg"/>
							{t("add")}
							</button>
							</div>
						</div>
					))}
				</div>
		</div>
	</>
	);
}

export default Products;