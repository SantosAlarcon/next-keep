"use client";
import {
	Bell,
	Calendar,
	ChartBar,
	ChevronDown,
	CreditCard,
	EllipsisV,
	Folder,
	Home,
	Inbox,
	Plus,
	Search,
	ShoppingCart,
	Sidebar as SidebarIcon,
	Star,
	Users,
} from "@primeicons/react";
import { useIsMobile } from "@primereact/hooks";
import { Avatar } from "@primereact/ui/avatar";
import { Button } from "@primereact/ui/button";
import { Sidebar } from "@primereact/ui/sidebar";
import * as React from "react";

type NavItem = {
	icon: React.FC<any>;
	label: string;
	isActive?: boolean;
	badge?: string;
	subItems?: { label: string; isActive?: boolean }[];
};

const navGroups: { label: string; action?: boolean; items: NavItem[] }[] = [
	{
		label: "Navigation",
		items: [
			{ icon: Home, label: "Home", isActive: true },
			{ icon: Inbox, label: "Inbox", badge: "12" },
			{ icon: Search, label: "Search" },
			{ icon: Bell, label: "Notifications", badge: "3" },
		],
	},
	{
		label: "Projects",
		action: true,
		items: [
			{
				icon: ChartBar,
				label: "Analytics",
				subItems: [
					{ label: "Overview", isActive: true },
					{ label: "Reports" },
					{ label: "Real-time" },
				],
			},
			{ icon: Users, label: "Team" },
			{ icon: Calendar, label: "Calendar" },
			{
				icon: Folder,
				label: "Documents",
				subItems: [
					{ label: "Shared" },
					{ label: "Private" },
					{ label: "Archived" },
				],
			},
		],
	},
	{
		label: "Billing",
		items: [
			{ icon: CreditCard, label: "Payments" },
			{ icon: ShoppingCart, label: "Orders" },
			{ icon: Star, label: "Subscriptions" },
		],
	},
];

export default function SidebarClient2() {
	const isMobile = useIsMobile(1024);

	return (
		<div
			style={{
				overflow: "hidden",
				borderRadius: "1rem",
				border:
					"1px light-dark(var(--p-surface-200), var(--p-surface-900)) solid",
			}}
		>
			<Sidebar.Layout>
				{isMobile && <Sidebar.Backdrop />}
				<Sidebar.Root
					id="preview"
					collapsible={isMobile ? "offcanvas" : "icon"}
					overlay={isMobile}
					defaultOpen={!isMobile}
				>
					<Sidebar.Spacer />
					<Sidebar.Aside>
						<Sidebar.Panel>
							<Sidebar.Header>
								<Sidebar.Menu>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton className="p-1!">
											<div
												style={{
													background:
														"linear-gradient(0deg, var(--p-violet-500) 0%, var(--p-indigo-600) 100%)",
													display: "flex",
													flexShrink: "0",
													alignItems: "center",
													justifyContent: "center",
													fontWeight: "bold",
													fontSize: "1.25rem",
													borderRadius: ".5rem",
													padding: "0 .25rem",
												}}
											>
												A
											</div>
											<span
												style={{
													fontWeight: "bold",
												}}
											>
												Acme Inc
											</span>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								</Sidebar.Menu>
							</Sidebar.Header>

							<Sidebar.Content>
								{navGroups.map((group) => (
									<Sidebar.Group key={group.label}>
										<Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>
										{group.action && (
											<Sidebar.GroupAction aria-label="Add new item">
												<Plus aria-hidden="true" />
											</Sidebar.GroupAction>
										)}
										<Sidebar.GroupContent>
											<Sidebar.Menu>
												{group.items.map((item) => (
													<Sidebar.MenuItem
														key={item.label}
														collapsible={!!item.subItems}
														defaultOpen={item.subItems?.some((s) => s.isActive)}
													>
														<Sidebar.MenuButton isActive={item.isActive}>
															<item.icon />
															<span>{item.label}</span>
															{item.subItems && (
																<ChevronDown className="ml-auto" />
															)}
														</Sidebar.MenuButton>
														{item.subItems ? (
															<Sidebar.MenuSub>
																{item.subItems.map((sub) => (
																	<Sidebar.MenuSubItem key={sub.label}>
																		<Sidebar.MenuSubButton
																			isActive={sub.isActive}
																		>
																			<span>{sub.label}</span>
																		</Sidebar.MenuSubButton>
																	</Sidebar.MenuSubItem>
																))}
															</Sidebar.MenuSub>
														) : item.badge ? (
															<Sidebar.MenuBadge>
																{item.badge}
															</Sidebar.MenuBadge>
														) : (
															<Sidebar.MenuAction showOnHover aria-label="More options">
																<EllipsisV aria-hidden="true" />
															</Sidebar.MenuAction>
														)}
													</Sidebar.MenuItem>
												))}
											</Sidebar.Menu>
										</Sidebar.GroupContent>
									</Sidebar.Group>
								))}
							</Sidebar.Content>

							<Sidebar.Footer>
								<Sidebar.Menu>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton className="p-1!">
											<Avatar.Root
												className="size-6! shrink-0! text-xs!"
												shape="circle"
											>
												<Avatar.Fallback>JD</Avatar.Fallback>
											</Avatar.Root>
											<span>John Doe</span>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								</Sidebar.Menu>
							</Sidebar.Footer>
							<Sidebar.Rail />
						</Sidebar.Panel>
					</Sidebar.Aside>
				</Sidebar.Root>

				<Sidebar.Main
					style={{
						width: "100%",
					}}
				>
					<header
						className="flex h-12 items-center gap-2 border-b border-surface-200 dark:border-surface-700 px-4"
						style={{
							display: "flex",
						}}
					>
						<Sidebar.Trigger
							as={Button}
							severity="secondary"
							variant="text"
							size="small"
							iconOnly
							aria-label="Toggle sidebar"
						>
							<SidebarIcon aria-hidden="true" />
						</Sidebar.Trigger>
					</header>
					<div
						style={{
							display: "flex",
							padding: "1rem",
							gap: "1rem",
							flexDirection: "column",
						}}
					>
						<div
							className="rounded-lg bg-surface-100 dark:bg-surface-800 h-48"
							style={{
								border:
									"1px light-dark(var(--p-surface-100), var(--p-surface-800)) solid",
								borderRadius: "1rem",
								height: "48px",
								background:
									"light-dark(var(--p-surface-100), var(--p-surface-800))",
							}}
						></div>
						<div className="rounded-lg bg-surface-100 dark:bg-surface-800 flex-1"></div>
					</div>
				</Sidebar.Main>
			</Sidebar.Layout>
		</div>
	);
}
