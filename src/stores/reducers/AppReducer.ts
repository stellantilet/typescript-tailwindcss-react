import ActionTypes, { ActionValues, AppState } from '../actions/ActionTypes'

export const initialState = {
  loading: false,
  submitting: false,
  user: null,
}

export const AppReducer = (state: AppState, action: ActionValues): AppState => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case ActionTypes.SET_SUBMITTING:
      return {
        ...state,
        submitting: action.payload,
      }
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload }
    default:
      throw new Error()
  }
}
export default AppReducer
