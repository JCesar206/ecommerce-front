import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";
import API from "../api/axios.js";
import toast from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";
import { CiCircleRemove } from "react-icons/ci";
import { IoTrashBin } from "react-icons/io5";

function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } =
    useCart();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = async () => {
		try {
			await API.post("/orders", { cart, total });

		setOpen(false);
    clearCart();
    toast.success("Pago realizco con éxito");
    // Redirigir despúes de pagar
    setTimeout(() => { navigate("/"); }, 1500);
		} catch {
			toast.error("Error en el pago");
		}
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{t("cart")}</h1>

      {cart.map((item) => (
        <div key={item.id}
        className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded shadow space-x-4">
          <p className="italic font-bold">{item.name}</p>
          <p className="font-bold">${item.price}</p>

          <input type="number" value={item.quantity} onChange={(e) =>
          updateQuantity(item.id, Math.max(1, Number(e.target.value))) }
          className="w-20 text-center px-3 py-2 border rounded-md text-red-600 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"/>

          <button onClick={() => removeFromCart(item.id)}
          className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded transition">
          <CiCircleRemove className="text-lg"/> <span>{t("remove")}</span>
      </button>
    </div>
  ))}

  <h2 className="text-xl font-semibold text-center underline">Total: ${total}</h2>

  <div className="space-y-3">
    <button onClick={() => navigate("/")}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold rounded transition">
      <IoMdArrowBack className="text-lg"/>
      <span>{t("continueShopping")}</span>
    </button>

    <button onClick={() => setOpen(true)} disabled={cart.length === 0}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded transition disabled:opacity-50">
      <GiPayMoney className="text-lg"/>
      <span>{t("pay")}</span>
    </button>

    <button onClick={() => { if (confirm("¿Vaciar carrito completo?")) { clearCart(); }
      }}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded transition">
      <IoTrashBin className="text-lg"/>
      <span>{t("emptyCart")}</span>
    </button>
  </div>

  {success && (
    <p className="mt-4 text-green-600">✅ {t("paymentSuccessfully")}</p>
  )}

  <PaymentModal open={open} onClose={() => setOpen(false)} onSuccess={handleSuccess} total={total}/>
</div>
  );
}

export default Cart;