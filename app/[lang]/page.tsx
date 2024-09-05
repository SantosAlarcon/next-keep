import { redirect } from "next/navigation";
import styles from "../styles/page.module.css";

async function Page({ params: { lang } }: {
	params: {
		lang: string
	}
}) {

	redirect("/notes/all")

	return (
		<main className={styles.main}>

		</main>
	);
}

export default Page
