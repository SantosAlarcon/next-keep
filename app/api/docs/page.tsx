import ReactSwagger from "./react-swagger";
import swaggerJSON from "@/public/swagger.json";

export default async function IndexPage() {
	if (process.env.NODE_ENV === "production") {
		return (
			<section className="container">
				<p>API documentation is not available in production.</p>
			</section>
		);
	}

	return (
		<section className="container">
			<ReactSwagger spec={swaggerJSON} />
		</section>
	);
}
