/** @type {import('next').NextConfig} */
const nextConfig = {
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
				hostname: "cloud.appwrite.io"
			}
		]
	}
};

export default nextConfig;
