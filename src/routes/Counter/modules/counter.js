// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const CASCADE_ADD = 'CASCADE_ADD'
export const CASCADE_MULT = 'CASCADE_MULT'
// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().counter
        })
        resolve()
      }, 200)
    })
  }
}
export const cascadeAdd = (x) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type : CASCADE_ADD,
        payload : getState().counter,
        x : x
      })
      resolve()
    })
  }
}
export const cascadeMult = (x) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type : CASCADE_MULT,
        payload : getState().counter,
        x : x
      })
      resolve()
    })
  }
}
export const actions = {
  increment,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,
  [CASCADE_MULT] : (state, action) => action.payload * action.x,
  [CASCADE_ADD] : (state, action) => action.payload + action.x
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
