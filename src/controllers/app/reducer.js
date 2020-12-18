import * as types from './types';

const initialState = {
  themeMode: 'light'
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_THEME_MODE:
      return {
        ...state,
        themeMode: action.payload
      };
    default:
      return state;
  }
}

export default appReducer;