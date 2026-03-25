import { useState, useEffect } from "react";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const { login, token } = useAuth();
	const { t } = useLanguage();
	const navigate = useNavigate();
	// Si ya esta leyendo home
	useEffect(() => {
		if (token) navigate("/");
	}, [token]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// setError("");

		try {
			const res = await API.post("/auth/login", {
				email,
				password
			});
			// Guardar token
			login(res.data);
			// Redirigir
			navigate("/");
		} catch (err) {
			console.error("ERROR COMPLETO:", err);
			if (err.response) {
				console.log("DATA:", err.response.data);
				console.log("STATUS:", err.response.status);
			}
			setError(JSON.stringify(err.response?.data?.message || "Error al iniciar sesión"));
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
			<form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80">
				<h2 className="text-xl mb-4 text-center">Login</h2>
				{error && ( <p className="text-red-500 text-sm mb-3">{error}</p>)}
				<input type="email" placeholder={t("email")} className="w-full p-2 mb-3 border rounded dark:text-black"
				value={email} onChange={(e) => setEmail(e.target.value)}/>
				
				<div className="relative mb-3">
					<input type={showPassword ? "text" : "password"} placeholder={t("password")} className="w-full p-2 mb-3 border rounded pr-10 dark:text-black" value={password} onChange={(e) => setPassword(e.target.value)}/>
					
					<button type="button" onClick={() => setShowPassword(!showPassword)}
					className="absolute right-2 top-2 text-gray-500 hover:text-gray-800 cursor-pointer">
					{showPassword ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}
					</button>
				</div>

				<button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 rounded-full text-white p-2 font-semibold cursor-pointer">{t("enter")}</button>

				<div className="flex justify-between mt-3 text-sm pt-2 pb-2">
					<button type="button" onClick={() => navigate("/register")}
					className="text-indigo-500 hover:text-indigo-700 font-semibold hover:underline cursor-pointer">
						{t("createAccount")}
					</button>

					<button type="button" onClick={() => navigate("/forgot")}
					className="text-gray-500 hover:text-gray-700 font-semibold hover:underline cursor-pointer">
						{t("forgot")}
					</button>

				</div>
				<div className="bg-yellow-100 text-yellow-800 p-3 mb-3 rounded text-sm">
					<p><strong>{t("user")}</strong> admin@test.com</p>
					<p><strong>{t("password1")}</strong> 123456</p>
				</div>
			</form>
		</div>
	);
 }

 export default Login;