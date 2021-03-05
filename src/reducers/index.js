const userReducer = (state = { users: [] }, { type, payload }) => {
  let users;
  switch (type) {
    case 'GET_USERS':
      // payload expected to be an array of all users
      return {
        ...state,
        users: payload
      }

    case 'ADD_USER':
      // payload expected to be user object
      users = [...state.users, payload]
      return {
        ...state,
        users
      }

    case 'REMOVE_USER':
      // payload expected to be user id
      users = state.users.filter(user => user.id !== payload)
      return {
        ...state,
        users
      }

    case 'UPDATE_USER':
      // payload expected to be user object
      users = state.users.map(user => user.id === payload.id ? payload : user)
      return {
        ...state,
        users
      }

    default:
      return state
  }
}

export default userReducer;