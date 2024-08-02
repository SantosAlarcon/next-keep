import ReactSwagger from './react-swagger';
import swaggerJSON from "@/public/swagger.json"

export default async function IndexPage() {
    console.log("Loading React Swagger...")

	return (
		<section className="container">
			<ReactSwagger spec={swaggerJSON} />
		</section>
	);
}
