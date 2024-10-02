import { redirect } from "next/navigation";
import { getSession } from "../utils/getSession";

async function Page({ params: { lang } }: {
	params: {
		lang: string
	}
}) {
	const session = await getSession();

	if (session) {
		return redirect("/notes/all");
	} else {
        return redirect(`/login/${lang}`)
    }
}

export default Page
