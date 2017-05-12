// When user logs in, a cookie with their id is sent to the client. Push that cookie to state.
const user = (state = null, action) => {
  switch (action.type) {
    case "READ_COOKIE":
      return action.userId || null
    default:
      return state
  }
}

export default user
