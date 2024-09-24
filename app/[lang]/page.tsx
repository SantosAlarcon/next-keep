import { redirect } from "next/navigation";
import styles from "../styles/page.module.css";
import { getSession } from "../utils/getSession";

async function Page({ params: { lang } }: {
	params: {
		lang: string
	}
}) {
    console.log("Rendering Root Page...")
	const session = await getSession();

	if (session) {
		return redirect("/notes/all");
	}

	return (
		<main className={styles.main}>

		</main>
	);
}

export default Page
