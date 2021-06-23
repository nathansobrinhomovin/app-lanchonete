import {combineReducers} from 'redux';

const INITIAL_STATE = {
  people: [],
  photo: null,
  token: "",
};

const login = (state, action) => {
  const newState = Object.assign({}, state, {});
  newState.data = action.data;
  return newState;
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
        return login(state, action);
    default:
      return state;
  }
};

export default reducer;