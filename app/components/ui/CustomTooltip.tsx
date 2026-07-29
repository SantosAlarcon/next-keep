import { Tooltip } from "@primereact/ui/tooltip";
import type { ReactNode } from "react";

const CustomTooltip = ({
	children,
	side,
	align,
	tooltipText,
}: {
	children: ReactNode;
	side: "top" | "left" | "right" | "bottom";
	align: "start" | "center" | "end";
	tooltipText: string;
}) => {
	return (
		<Tooltip.Root>
			<Tooltip.Portal>
				<Tooltip.Trigger>{children}</Tooltip.Trigger>
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
