# Promised actions
~~~~javascript
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
~~~~

# Cascaded Promise Actions
~~~~javascript
const mergeProps = (state, disp, ownProps) => {
  let props = Object.assign({}, state, disp, ownProps)
  props.cascade = () => {
    disp.cascadeAdd(5)
      .then(disp.cascadeMult(5))
      .then(disp.cascadeMult(5))
  }
  return props
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Counter)
~~~~

