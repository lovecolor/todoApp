import { useState, useCallback, useEffect } from "react"

const useQuery = <T>(initialQuery: T) => {
  const [query, setQuery] = useState<T>(initialQuery)

  const patchQuery = (data) => {
    setQuery({
      ...query,
      ...data,
    })
  }

  return {
    query,
    patchQuery,
  }
}

export default useQuery
