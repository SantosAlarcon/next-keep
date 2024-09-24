import { redirect } from "next/navigation";
import styles from "../styles/page.module.css";
import { getSession } from "../utils/getSession";

export const dynamic = "force-dynamic";

async function Page({ params: { lang } }: {
	params: {
		lang: string
	}
}) {
	const session = await getSession();

	if (session) {
		return redirect(`/notes/all`);
	}

	return (
		<main className={styles.main}>

		</main>
	);
}

export default Page
