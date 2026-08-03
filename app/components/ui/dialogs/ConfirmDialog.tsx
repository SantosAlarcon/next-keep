import { Button } from "@primereact/ui/button";
import { Dialog } from "@primereact/ui/dialog";
import { useState, type ReactNode } from "react";
import Spinner from "../Spinner";

const ConfirmDialog = ({
	open,
	value,
	header,
	message,
	severity,
	acceptLabel,
	cancelLabel,
	accept,
	onHide,
}: {
	open: boolean;
	value?: string;
	header: string;
	message: ReactNode;
	severity: "warn" | "info" | "danger" | "hint";
	acceptLabel: string;
	cancelLabel: string;
	accept: () => void;
	onHide: () => void;
}) => {
	const [pending, setPending] = useState<boolean>(false);
	
    return (
		<Dialog.Root open={open} draggable={false} dismissable>
			{ value && <Dialog.Trigger as={Button} severity={severity}>
				{value}
			</Dialog.Trigger> }
			<Dialog.Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Popup>
						<Dialog.Header>{header}</Dialog.Header>
						<Dialog.Content>
							<div className="">{message}</div>
						</Dialog.Content>
						<Dialog.Footer>
							<Dialog.Close
								as={Button}
								severity="secondary"
								pt-root-onClick={onHide}
							>
								{cancelLabel}
							</Dialog.Close>
							<Dialog.Close
								as={Button}
								severity={severity}
								pt-root-onClick={() => {
									setPending(true);
									accept();
									setPending(false);
								}}
							>
								{pending ? <Spinner size={"20"} color="" /> : acceptLabel}
							</Dialog.Close>
						</Dialog.Footer>
					</Dialog.Popup>
				</Dialog.Positioner>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default ConfirmDialog;
