"use client";
import "swagger-ui-react/swagger-ui.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SwaggerUIReact = dynamic(() => import("swagger-ui-react"), {
	ssr: false,
});

type Props = {
	spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
	return (
		<Suspense fallback={<p>Loading API docs...</p>}>
			{/* @ts-ignore - swagger-ui-react types conflict with dynamic import */}
			<SwaggerUIReact spec={spec} />
		</Suspense>
	);
}

export default ReactSwagger;
