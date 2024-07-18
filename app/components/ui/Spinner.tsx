import spinnerStyles from "@/app/styles/Spinner.module.css"

const Spinner = ({ width, height }: { width: string; height: string }) => {
	return (
		<span
			style={{
				width: width,
				height: height,
			}}
			className={spinnerStyles.spinner__container}
		/>
	);
};

export default Spinner;
