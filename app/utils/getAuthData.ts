import { appwriteAccount } from "../appwrite";

export const getAuthData = async () => {
	const [user, session] = await Promise.all([
		appwriteAccount.get(),
		appwriteAccount.getSession("current"),
	]);

	return { user, session };
};
