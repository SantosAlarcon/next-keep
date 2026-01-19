import { createSwaggerSpec } from "next-swagger-doc";

import "server-only";

export const getApiDocs = async () => {
	const spec = createSwaggerSpec({
		apiFolder: "app/api",
		definition: {
			openapi: "3.0.0",
			info: {
				title: "Next Keep API",
				version: "1.0.0",
			},
		},
	});
	return spec;
};
