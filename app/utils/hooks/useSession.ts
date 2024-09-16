import { appwriteAccount } from "@/app/appwrite";
import type { Models } from "appwrite";
import { useEffect, useState } from "react";
import router from "next/navigation";

export const useSession = () => {
	const [currentSession, setCurrentSession] = useState<Models.Session | null>(null);

	const getSession = async () => {
		const session = await appwriteAccount.getSession("current");
        console.log(session)

		if (session) {
			setCurrentSession(session);
		} else {
            router.redirect("/notes/all")
		}
	};

	useEffect(() => {
		getSession();
	}, []);

	return currentSession;
};
