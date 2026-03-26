import { useTranslation } from "../hooks/useTranslation";

function Home() {
	const { t } = useTranslation();

	return (
		<div className="p-5">
			<h1 className="text-2xl">{t("welcome")}</h1>
		</div>
	);
}

export default Home;