import { Tooltip } from "@primereact/ui/tooltip";
import type { ComponentType, ReactNode } from "react";

const CustomTooltip = ({
	children,
	side,
	align,
	tooltipText,
	onClick,
	severity,
	as,
}: {
	children: ReactNode;
	side: "top" | "left" | "right" | "bottom";
	align: "start" | "center" | "end";
	tooltipText: string;
	onClick: () => void;
	severity: "warn" | "info" | "hint" | "danger" | "primary" | "secondary";
	as?: ComponentType;
}) => {
	return (
		<Tooltip.Root>
			<Tooltip.Trigger
				as={as}
				pt-root-onClick={onClick}
				severity={severity}
				pt-root-aria-label={tooltipText}
			>
				{children}
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Positioner side={side} align={align}>
					<Tooltip.Popup>
						<Tooltip.Arrow />
						{tooltipText}
					</Tooltip.Popup>
				</Tooltip.Positioner>
			</Tooltip.Portal>
		</Tooltip.Root>
	);
};

export default CustomTooltip;
