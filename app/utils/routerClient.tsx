"use client";

import { useRouter } from "next/navigation";

const routerClient = () => {
	const router = useRouter();
	return router;
};

export default routerClient;
