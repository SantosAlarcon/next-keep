import { createSwaggerSpec } from 'next-swagger-doc';
import swaggerJSON from "@/next-swagger-doc.json"

import 'server-only';

export const getApiDocs = async () => {
	const spec = createSwaggerSpec(swaggerJSON);
	console.log(spec)
	return spec;
};
