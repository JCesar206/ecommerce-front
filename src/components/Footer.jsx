import { useLanguage } from "../context/LanguageContext";
import { FaGithub, FaLinkedin, FaEnvelope, FaHome } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function Footer() {
	const { t } = useLanguage();

	return (
		<footer className="fixed bottom-4 left-0 w-full px-4">
	  <div className="w-full bg-white/80 dark:bg-gray-600/20 backdrop-blur-xl shadow-md rounded-full py-2 pb-2">
    	<div className="max-w-6xl mx-auto px-3 flex flex-col items-center gap-4">
				{/*Social icons*/}
				<div className="flex gap-5">
					<a href="http://julioym.asteroi.dev/" target="_blank" rel="noreferrer"
						className="text-gray-600 hover:text-black dark:hover:text-gray-300 transition hover:scale-110">
          	<FaHome size={20}/>
        	</a>
					<a href="https://github.com/JCesar206" target="_blank" rel="noreferrer"
						className="text-gray-600 hover:text-black dark:hover:text-gray-300 transition hover:scale-110">
          	<FaGithub size={20}/>
        	</a>
					<a href="https://www.linkedin.com/in/jcesar206" target="_blank" rel="noreferrer"
						className="text-gray-600 hover:text-black dark:hover:text-gray-300 transition hover:scale-110">
          	<FaLinkedin size={20}/>
        	</a>
        	<a href="mailto:jcesar206@hotmail.com" className="text-gray-600 hover:text-black dark:hover:text-gray-300 transition hover:scale-110">
	          <FaEnvelope size={20}/>
        	</a>
					<a href="mailto:jcesary06@gmail.com" className="text-gray-600 hover:text-black dark:hover:text-gray-300 transition hover:scale-110">
          	<SiGmail size={20}/>
        	</a>
			</div>
			{/*Copyright*/}
			<p className="text-sm text-gray-500 dark:text-gray-400 text-center font-bold">
				&copy; {new Date().getFullYear()} {t("app")} | Juls | {t("rights")}</p>
			</div>
		</div>
		</footer>
	);
}

export default Footer;