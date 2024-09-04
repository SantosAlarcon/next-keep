import React, { ReactNode } from 'react'

const PruebaLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html>
			<head>
			</head>
			<body>
				{children}
			</body>
		</html>
	)
}

export default PruebaLayout
