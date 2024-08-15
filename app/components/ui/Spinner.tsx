import spinnerStyles from "@/app/styles/Spinner.module.css"

const Spinner = ({ width, height, border }: { width: string; height: string; border: string }) => {
	return (
		<span
			style={{
				width: width,
				height: height,
                border: `${border} solid #66f`
			}}
			className={spinnerStyles.spinner__container}
		/>
	);
};

export default Spinner;
