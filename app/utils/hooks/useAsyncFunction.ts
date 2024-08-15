import { AsyncFunctionState } from "@/app/types"
import { useState } from "react"

export const useAsyncFunction = (func: () => void) => {
    const [asyncFunctionState, setAsyncFunctionState] = useState<AsyncFunctionState>(AsyncFunctionState.OK)

    try {
        setAsyncFunctionState(AsyncFunctionState.Pending)
        func()
        setAsyncFunctionState(AsyncFunctionState.OK)
    } catch (error) {
        setAsyncFunctionState(AsyncFunctionState.Error)
        console.log(error);
    }

    return {asyncFunctionState}
}
