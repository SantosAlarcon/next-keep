/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
	transpilePackages: ["swagger-ui-react", "i18next", "react-i18next"],
	optimizeFonts: true,
	experimental: {
		optimizePackageImports: ["primereact", "@uiw/react-markdown-editor", "@uiw/react-markdown-preview"],
	},
};

export default nextConfig;
