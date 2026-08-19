import { ChevronDown } from "@primeicons/react/chevron-down";
import { Select, type SelectValueChangeEvent } from "@primereact/ui/select";

const CustomSelect = ({
	value,
	onValueChange,
	options,
	placeholder,
	ariaLabel,
}: {
	value: string;
	onValueChange: (e: SelectValueChangeEvent) => void;
	options: string[];
	placeholder?: string;
	ariaLabel?: string;
}) => {
	return (
		<Select.Root value={value} onValueChange={onValueChange} options={options}>
			<Select.Trigger aria-label={ariaLabel}>
				<Select.Value placeholder={placeholder}></Select.Value>
				<Select.Indicator>
					<ChevronDown aria-hidden="true" />
				</Select.Indicator>
			</Select.Trigger>

			<Select.Portal>
				<Select.Positioner>
					<Select.Popup>
						<Select.List />
					</Select.Popup>
				</Select.Positioner>
			</Select.Portal>
		</Select.Root>
	);
};

export default CustomSelect;
