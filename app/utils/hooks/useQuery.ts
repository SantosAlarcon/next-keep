import { useEffect, useState } from "react"

const useQuery = (queryFn) => {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [isPending, setIsPending] = useState<boolean>(false)

	useEffect(() => {
		setIsPending(true)
		queryFn().then((data) => {
			setData(data)
		}).catch((err) => {
			setError(err)
		}).finally(() => setIsPending(false))
	}, [queryFn])

	return { data, error, isPending }
}

export default useQuery
