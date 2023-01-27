import useSWR from 'swr'
import fetcher from './fetcher'

const useInitiative = (code: string) => {
  const { data, error } = useSWR(`/api/initiative/${code}`, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useInitiative
