"use client";
import "swagger-ui-react/swagger-ui.css";
import SwaggerUIReact from "swagger-ui-react";
import { Suspense } from "react";

type Props = {
	spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
	// @ts-ignore - SwaggerUI is not typed
	return (
		<Suspense fallback="Loading component...">
			<SwaggerUIReact spec={spec} />
		</Suspense>
	);
}

export default ReactSwagger;
