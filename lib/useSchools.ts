import useSWR from 'swr'
import fetcher from './fetcher'

const useSchools = (postcode: string) => {
  const { data, error } = useSWR(
    postcode.length === 4 ? `/api/schools?postcode=${postcode}` : null,
    fetcher
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useSchools
