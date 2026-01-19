const FixedIcon = ({ width, height }: { width: string; height: string }) => {
	return (
		<svg
			strokeWidth="8"
			xmlns="http://www.w3.org/2000/svg"
			version="1.2"
			viewBox="0 0 24 24"
			width={width}
			height={height}
		>
			<path
				id="icon"
				strokeWidth="16px"
				fill="currentColor"
				className="s0"
				d="m17 14v2h-5v4.5l-0.5 1.5-0.5-1.5v-4.5h-5v-2l2-2v-6h-1v-3h9v3h-1v6z"
			/>
		</svg>
	);
};

export default FixedIcon;
