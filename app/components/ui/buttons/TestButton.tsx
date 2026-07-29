"use client";

import { Button } from "@primereact/ui/button";
import { toast } from "sonner";
import { testPromise } from "@/app/utils/testPromise";

const TestButton = () => {
	// @ts-ignore
	const handleTestButton = () => {
		toast.promise(testPromise, {
			loading: "Loading...",
			success: "Se ha cumplido la promesa. Ahora a masturbarse!!",
			error: "Ha habido un error chungo. El fapeo hay que dejarlo luego",
		});
	};

	return <Button label="Comeme el miembro" onClick={handleTestButton} />;
};

export default TestButton;
