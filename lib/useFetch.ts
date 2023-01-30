import { useEffect, useRef, useReducer } from 'react'
import { Initiative, School } from './interfaces'

interface State {
  isLoading: boolean
  error: any
  data: School[] | Initiative
}

enum ActionType {
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
  FETCH_ERROR = 'FETCH_ERROR'
}

interface Action {
  type: ActionType
  payload?: any
}

const useFetch = (url: string | null) => {
  const cache = useRef<{ [key: string]: any }>({})

  const initialState = {
    isLoading: true,
    error: null,
    data: []
  }

  const [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case ActionType.FETCHING:
        return { ...initialState, isLoading: true }
      case ActionType.FETCHED:
        return { ...initialState, isLoading: false, data: action.payload }
      case ActionType.FETCH_ERROR:
        return { ...initialState, isLoading: false, error: action.payload }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    let cancelRequest = false
    if (!url || !url.trim()) {
      dispatch({ type: ActionType.FETCH_ERROR, payload: 'Not a valid URL' })
      return
    }

    const fetchData = async () => {
      dispatch({ type: ActionType.FETCHING })
      if (cache.current[url]) {
        const data = cache.current[url]
        dispatch({ type: ActionType.FETCHED, payload: data })
      } else {
        try {
          const response = await fetch(url)
          const data = await response.json()
          cache.current[url] = data
          if (cancelRequest) return
          dispatch({ type: ActionType.FETCHED, payload: data })
        } catch (error: any) {
          if (cancelRequest) return
          dispatch({ type: ActionType.FETCH_ERROR, payload: error.message })
        }
      }
    }

    fetchData()

    return function cleanup () {
      cancelRequest = true
    }
  }, [url])

  return state
}

export default useFetch
