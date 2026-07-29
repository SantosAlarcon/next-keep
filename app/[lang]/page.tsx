import { redirect } from "next/navigation";
import { getSession } from "../utils/getSession";

async function Page({
	params,
}: {
	params: Promise<{
		lang: string;
	}>;
}) {
	const { lang } = await params;
	const session = await getSession();

	if (session) {
		return redirect(`${lang}/notes/all`);
	} else {
		return redirect(`${lang}/login`);
	}
}

export default Page;
