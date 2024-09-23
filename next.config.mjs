/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: '/',
				headers: [
					{
						key: 'Referer-Policy',
						value: 'strict-origin-when-cross-origin'
					}
				]
			}
		]
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
				hostname: "cloud.appwrite.io"
			}
		]
	}
};

export default nextConfig;
