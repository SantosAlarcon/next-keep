export const ExpandIcon = ({
	width,
	height,
}: { width: string; height: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 16 16"
			fill="none"
		>
			<g fill="currentColor">
				<path xmlns="http://www.w3.org/2000/svg" d="M7.774 5.263a.7.7 0 11.952-1.026l3.5 3.25a.7.7 0 010 1.026l-3.5 3.25a.7.7 0 01-.952-1.026L10.72 8 7.774 5.263z"/>
				<path
					fillRule="evenodd"
					d="M1 3.25A2.25 2.25 0 013.25 1h9.5A2.25 2.25 0 0115 3.25v9.5A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75v-9.5zm2.25-.75a.75.75 0 00-.75.75v9.5c0 .414.336.75.75.75h1.3v-11h-1.3zm9.5 11h-6.8v-11h6.8a.75.75 0 01.75.75v9.5a.75.75 0 01-.75.75z"
					clipRule="evenodd"
				/>
			</g>
		</svg>
	);
};
