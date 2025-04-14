// Action Types
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_USERS = 'SET_USERS';

// Action Creators
export const addUser = (user) => ({
  type: ADD_USER,
  payload: { ...user, id: Date.now().toString() } // Generate a unique ID
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: userId
});

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users
});