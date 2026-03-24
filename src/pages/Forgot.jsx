import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Forgot() {
	const navigate = useNavigate();
	const { t } = useLanguage();

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80">
				<h2 className="text-lg font-bold mb-3">{t("recoverPassword")}</h2>

				<input placeholder="Tu email"
				className="w-full p-2 border rounded mb-3"/>
				<button className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-semibold p-2 rounded-full">
					{t("send")}
				</button>
				<button onClick={() => navigate("/login")}
				className="mt-3 text-sm text-gray-500 hover:underline hover:text-gray-700 font-semibold cursor-pointer">
					{t("returnToLogin")}
				</button>
			</div>
		</div>
	);
}

export default Forgot;