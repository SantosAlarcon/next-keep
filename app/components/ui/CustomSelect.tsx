import { ChevronDown } from "@primeicons/react/chevron-down";
import { Select, type SelectValueChangeEvent } from "@primereact/ui/select";

const CustomSelect = ({
	value,
	onValueChange,
	options,
	placeholder,
}: {
	value: string;
	onValueChange: (e: SelectValueChangeEvent) => void;
	options: string[];
	placeholder?: string;
}) => {
	return (
		<Select.Root value={value} onValueChange={onValueChange} options={options}>
			<Select.Trigger>
				<Select.Value placeholder={placeholder}></Select.Value>
				<Select.Indicator>
					<ChevronDown />
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
