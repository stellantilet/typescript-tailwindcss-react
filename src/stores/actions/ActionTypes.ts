/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AppState {
  submitting?: boolean
  loading?: boolean
  user?: any
}

export interface ActionValues {
  type: string
  payload: number | string | boolean | AppState | any | null
}

enum ActionTypes {
  SET_SUBMITTING = 'SET_SUBMITTING',
  SET_LOADING = 'SET_LOADING',
  SET_USER = 'SET_USER',
}

export default ActionTypes
