import { useEffect, useState, useRef } from "react";

const useDebounce = (state: any, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState<any>(state);
	const timerRef = useRef();
	const [pending, setPending] = useState<boolean>(false);

	useEffect(() => {
		setPending(true);
		// @ts-ignore
		timerRef.current = setTimeout(() => {
			setDebouncedValue(state);
			setPending(false);
		}, delay);

		return () => {
			clearTimeout(timerRef.current);
		};
	}, [state, delay]);

	return [debouncedValue, pending];
};

export default useDebounce;
