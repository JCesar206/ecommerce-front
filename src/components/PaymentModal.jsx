import { useState } from "react";
import { motion, scale } from "framer-motion";

function PaymentModal({ open, onClose, onSuccess, total }) {
  const [form, setForm] = useState({ card: "", name: "", date: "", cvv: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ FIX

  if (!open) return null;

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.value === "card") {
      value = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1")
        .trim();
    }
    setForm({...form, [e.target.name]: value });
  };

  const validate = () => {
    return (
      form.card.length >= 16 &&
      form.name !== "" &&
      form.date !== "" &&
      form.cvv.length >= 3
    );
  };

  const handlePay = async () => {
    setError("");

    if (!validate()) {
      setError("Datos inválidos");
      return;
    }

    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 2000));

      onSuccess(); // Primero éxito
      onClose();   // Luego cerrar
    } catch (err) {
      setError("Error en el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded w-full max-w-md shadow-lg"
      >
        
        <h2 className="text-xl font-bold mb-4">
          Pago - ${total}
        </h2>

        {error && (
          <p className="text-red-500 mb-2">{error}</p>
        )}

        <input name="card" maxLength="19"
        placeholder="1234 5678 9012 3456"
        className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        onChange={handleChange}/>
        <input name="name" placeholder="Nombre" className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}/>
        <input name="date" placeholder="MM/YY" className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}/>
        <input name="cvv" maxLength="4"
        placeholder="123"
        className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        onChange={handleChange}/>

        <div className="flex gap-2">
          <button onClick={handlePay}
            className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition 
            text-white p-2 rounded">
            {loading ? "Procesando..." : "Pagar"}
          </button>

          <button onClick={onClose}
            className="w-full bg-gray-400 hover:bg-gray-500 active:scale-95 
            transition-none text-white p-2 rounded">
            Cancelar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PaymentModal;