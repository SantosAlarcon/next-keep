import { ContextMenu } from "@primereact/ui/contextmenu";
import type { Ref } from "react";
import type { ContextMenuItem } from "@/app/types";

const CustomContextMenu = ({
	ref,
	model,
}: {
	ref: Ref<unknown>;
	model: ContextMenuItem[];
}) => {
	return (
		<ContextMenu.Root>
			<ContextMenu.Portal ref={ref}>
				<ContextMenu.Positioner>
					<ContextMenu.Popup>
						<ContextMenu.List>
							{model.map((item: ContextMenuItem) => (
								<ContextMenu.Item
									key={item.label}
									pt-root-onClick={item.command}
								>
									{item.icon}
									{item.label}
								</ContextMenu.Item>
							))}
						</ContextMenu.List>
					</ContextMenu.Popup>
				</ContextMenu.Positioner>
			</ContextMenu.Portal>
		</ContextMenu.Root>
	);
};

export default CustomContextMenu;
