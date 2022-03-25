/* eslint-disable @typescript-eslint/no-explicit-any */
import ActionTypes, { ActionValues, AppState } from './ActionTypes'

export const setAuth = (
  payload: number | string | boolean | AppState | any | null,
): ActionValues => {
  return {
    type: ActionTypes.SET_USER,
    payload,
  }
}

export const setLoading = (payload: boolean): ActionValues => {
  return {
    type: ActionTypes.SET_LOADING,
    payload,
  }
}

export const setSubmitting = (payload: boolean): ActionValues => {
  return {
    type: ActionTypes.SET_SUBMITTING,
    payload,
  }
}
