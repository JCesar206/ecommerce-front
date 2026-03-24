import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

function Orders() {
	const { cart, total } = useCart();
	const { t } = useLanguage();
	const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<div className="p-6 max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">{t("orders")}</h1>

			{cart.length === 0 ? (
				<p className="text-gray-500">{t("emptyCart")}</p>
			) : (
				<>
				<div className="space-y-3">
					{cart.map((item) => (
						<div key={item.id} className="bg-white dark:bg-gray.800 p-3 rounded shadow flex justify-between">
							<div>
								<p className="font-semibold">{item.name}</p>
								<p className="text-sm">${item.price}</p>
							</div>

							<div>
								<p>x{item.quantity}</p>
							</div>
						</div>
					))}
				</div>

				<div className="mt-6">
					<p className="text-sm text-gray-500">
						{itemsCount} Item(s)
					</p>

					<h2 className="text-xl font-bold">
						{t("total")}: ${total}
					</h2>
				</div>
				</>
			)}
		</div>
	);
}

export default Orders;