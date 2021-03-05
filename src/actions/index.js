export const getUsers = (usersArray) => {
  return {
    type: 'GET_USERS',
    payload: usersArray
  }
}

export const createUser = (userObject) => {
  return {
    type: 'ADD_USER',
    payload: userObject
  }
}

export const deleteUser = (id) => {
  return {
    type: 'REMOVE_USER',
    payload: id
  }
}

export const updateUser = (userObject) => {
  return {
    type: 'UPDATE_USER',
    payload: userObject
  }
}