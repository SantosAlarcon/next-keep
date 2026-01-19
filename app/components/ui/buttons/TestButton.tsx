"use client";

import { testPromise } from "@/app/utils/testPromise";
import { Button } from "primereact/button";
import { toast } from "sonner";

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
