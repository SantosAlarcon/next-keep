import { EllipsisV } from "@primeicons/react/ellipsis-v";
import { Menu } from "@primereact/ui/menu";
import { SidebarMenuAction } from "@primereact/ui/sidebar";
import type { MenuItem } from "@/app/types";

const CustomSidebarMenu = ({ model }: { model: MenuItem[] }) => {
	return (
		<Menu.Root>
			<Menu.Trigger showOnHover as={SidebarMenuAction}>
				<EllipsisV />
			</Menu.Trigger>
			<Menu.Portal>
				<Menu.Positioner sideOffset={4}>
					<Menu.Popup>
						<Menu.List>
							{model.map((item: MenuItem) => (
								<Menu.Item key={item.label} onSelect={item.command}>
									<item.icon />
									{item.label}
								</Menu.Item>
							))}
						</Menu.List>
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		</Menu.Root>
	);
};

export default CustomSidebarMenu;
