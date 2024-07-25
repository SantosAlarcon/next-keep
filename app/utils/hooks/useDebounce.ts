import { useEffect, useState, useRef } from "react"

const useDebounce = (state: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<any>(state);
    const timerRef = useRef()

    useEffect(() => {
	// @ts-ignore
	timerRef.current = setTimeout(() => setDebouncedValue(state), delay)
	return () => {
	    clearTimeout(timerRef.current)
	}
    }, [state, delay])

    return debouncedValue;
}

export default useDebounce;
