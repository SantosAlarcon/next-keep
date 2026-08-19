import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/api/(.*)",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, DELETE, OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type, Authorization",
					},
				],
			},
			{
				source: "/(.*)",
				headers: [
					{
						key: "x-middleware-cache",
						value: "no-cache",
					},
				],
			},
		];
	},
	pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
	// transpilePackages: ["swagger-ui-react", "i18next", "react-i18next"],
	// reactCompiler: true,
	experimental: {
		optimizePackageImports: [
			"@primereact",
			"@primeicons/react",
			"@uiw/react-md-editor",
			"@uiw/react-markdown-preview",
		],
		useTypeScriptCli: true
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cloud.appwrite.io",
			},
		],
	},
};

export default nextConfig;
