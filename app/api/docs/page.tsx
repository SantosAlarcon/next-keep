import ReactSwagger from './react-swagger';
import swaggerJSON from "@/public/swagger.json"

export default async function IndexPage() {
	return (
		<section className="container">
			<ReactSwagger spec={swaggerJSON} />
		</section>
	);
}
