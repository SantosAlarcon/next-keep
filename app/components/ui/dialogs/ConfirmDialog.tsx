import { Button } from "@primereact/ui/button";
import { Dialog } from "@primereact/ui/dialog";
import type { ReactNode } from "react";

const ConfirmDialog = ({
	open,
	value,
	header,
	message,
	severity,
	acceptLabel,
	cancelLabel,
	accept,
}: {
	open: boolean;
	value: string;
	header: string;
	message: ReactNode;
	severity: "warn" | "info" | "danger" | "hint";
	acceptLabel: string;
	cancelLabel: string;
	accept: () => void;
}) => {
	return (
		<div className="">
			<Dialog.Root open={open} draggable={false}>
				<Dialog.Trigger as={Button} severity={severity}>
					{value}
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Popup>
							<Dialog.Header>{header}</Dialog.Header>
							<Dialog.Content>
								<div className="">{message}</div>
							</Dialog.Content>
							<Dialog.Footer>
								<Dialog.Close as={Button} severity="secondary">
									{cancelLabel}
								</Dialog.Close>
								<Dialog.Close
									as={Button}
									severity={severity}
									pt-root-onClick={accept}
								>
									{acceptLabel}
								</Dialog.Close>
							</Dialog.Footer>
						</Dialog.Popup>
					</Dialog.Positioner>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
};

export default ConfirmDialog;
