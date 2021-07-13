import { useState, useCallback } from "react"

const useAsync = (asyncFuntion: (...data: any) => any) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [result, setResult] = useState<any>(null)

    const run = useCallback(
        async (...data: any) => {
            setLoading(true)
            try {
                const responseData = await asyncFuntion(...data)
                setLoading(false)
                setResult(responseData)
            } catch (error) {
                setError(error || "Something went wrong!")
                setLoading(false)
            }
        },
        [asyncFuntion],
    )
    return {
        run, loading, error, result
    }

}
export default useAsync