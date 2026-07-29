"use client";
import { PrimeReactProvider, PrimeReactStyleSheet } from "@primereact/core";
import { useServerInsertedHTML } from "next/navigation";
import type { ReactNode } from "react";
import Ice from "../themes/ice";

const styledStyleSheet = new PrimeReactStyleSheet();

export default function PrimeSSRProvider({
	children,
}: Readonly<{
	children?: ReactNode;
}>) {
	useServerInsertedHTML(() => {
		const styleElements = styledStyleSheet.getAllElements();

		console.log("STYLE ELEMENTS: ", styleElements);

		styledStyleSheet.clear();

		return <>{styleElements}</>;
	});

	const primereact = {
		theme: {
			preset: Ice,
			cssVariables: true,
		},
		license: "PrimeUI-Commercial-Key...",
	};

	return (
		<PrimeReactProvider {...primereact} stylesheet={styledStyleSheet}>
			{children}
		</PrimeReactProvider>
	);
}
