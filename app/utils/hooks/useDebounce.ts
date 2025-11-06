import { useEffect, useState, useRef } from "react";

const useDebounce = (state: any, delay: number) => {
	const [pending, setPending] = useState<boolean>(false);
	const [debouncedValue, setDebouncedValue] = useState<any>(state);
	const timerRef = useRef(null);

	useEffect(() => {
		setPending(true);
		// @ts-ignore
		timerRef.current = setTimeout(() => {
			setDebouncedValue(state);
			setPending(false);
		}, delay);

		return () => {
			// @ts-ignore
			clearTimeout(timerRef?.current);
		};
	}, [state, delay]);

	return [debouncedValue, pending];
};

export default useDebounce;
