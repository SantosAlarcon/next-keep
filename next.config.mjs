/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: "/api/(.*)",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "*",
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
		];
	},
	pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
	transpilePackages: ["swagger-ui-react", "i18next", "react-i18next"],
	optimizeFonts: true,
	experimental: {
		optimizePackageImports: ["primereact", "@uiw/react-md-editor", "@uiw/react-markdown-preview"],
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
