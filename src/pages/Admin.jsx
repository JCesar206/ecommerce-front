import { useState, useRef, useEffect } from "react";
import API from "../api/axios";
import { useLanguage } from "../context/LanguageContext.jsx";

function Admin() {
  const [form, setForm] = useState({ name: "", price: "", stock: "", description: "" });
	const [products, setProducts] = useState([]);
	const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
	const { t } = useLanguage();
  
  const nameRef = useRef(null);

  // Focus Automático
  useEffect(() => {
		fetchProducts();
    nameRef.current.focus();
  }, []);

	const fetchProducts = async () => {
		try {
			const res = await API.get("/products");
			setProducts(res.data);
		} catch (err) {
			console.error(err);
		}
	};

  const handleChange = (e) => { setForm({...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Limpiar Form
  const resetForm = () => {
    setForm({ name: "",price: "",stock: "",description: "" });
    setImage(null);
    setPreview(null);
		setEditingId(null)
    nameRef.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

		const data = new FormData();
		Object.entries(form).forEach(([k, v]) => data.append(k, v));
		if (image) data.append("image", image);

    try {
      if (editingId) {
				await API.put(`/products/${editingId}`, data);
			} else {
				await API.post("/products", data);
			}
			fetchProducts();
			resetForm();
    } catch (err) {
      console.error(err);
    }
  };

	const handleEdit = (product) => {
		setForm({ name: product.name, price: product.price, stock: product.stock, description: product.description || "" });
		setEditingId(product.id);
		setPreview(
			product.image
			? `http://localhost:4000/${product.image}`
			: null
		);
		nameRef.current.focus();
	};

	const handleDelete = async (id) => {
		if (!confirm("¿Eliminar producto?")) return;
		try {
			await API.delete(`/products/${id}`);
			fetchProducts();
		} catch (err) {
			console.error(err);
		}
	};

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
				<h2 className="font-bold mb-3">
					{editingId ? t("edit") : t("creat")} {t("product")}
				</h2>

        <input ref={nameRef} name="name" placeholder="Nombre" className="w-full mb-3 p-2 border rounded"
          value={form.name} onChange={handleChange}/>

        <input name="price" type="number" placeholder="Precio" className="w-full mb-3 p-2 border rounded"
          value={form.price} onChange={handleChange}/>

        <input name="stock" type="number" placeholder="Stock" className="w-full mb-3 p-2 border rounded"
          value={form.stock} onChange={handleChange}/>

        <textarea name="description" placeholder="Descripción" className="w-full mb-3 p-2 border rounded"
          value={form.description} onChange={handleChange}/>
        <input type="file" onChange={handleImage} className="mb-2"/>

        {preview && (
          <img src={preview} alt="preview" className="h-32 object-cover mb-3 rounded"/>
        )}

        <div className="flex gap-2">
          <button
					className="w-full bg-indigo-500 hover:bg-indigo-700 text-white px-3 py-1 rounded cursor-pointer">
            {t("save")}
          </button>

          <button type="button" onClick={resetForm}
            className="w-full bg-gray-400 hover:bg-gray-600 text-white p-2 rounded cursor-pointer">
            {t("clean")}
          </button>
        </div>
      </form>

			{/* Lista */}
			<div>
				<h2 className="font-bold mb-3">{t("product")}</h2>
				<div className="space-y-3">
					{products.map((p) => (
						<div key={p.id}
						className="bg-white dark:bg-gray-800 p-3 rounded shadow flex justify-between items-center">
							<div className="flex gap-3 items-center">
								<img src={p.image ? `http://localhost:4000/${p.image}` :
								"https://via.placeholder.com/80"}
								className="w.16 h16 object-cover rounded"/>

								<div>
									<p className="font-semibold">{p.name}</p>
									<p className="text-sm">${p.price}</p>
								</div>
							</div>

							<div className="flex gap-2">
								<button onClick={() => handleEdit(p)}
								className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold px-2 py-1 rounded cursor-pointer">
									{t("edit")}
								</button>
								<button onClick={() => handleDelete(id)}
								className="bg-red-500 hover:bg-red-700 text-white font-semibold px-2 py-1 rounded cursor-pointer">
									{t("delete")}
								</button>
							</div>
						</div>	
					))}
				</div>
			</div>
    </div>
  );
}

export default Admin;