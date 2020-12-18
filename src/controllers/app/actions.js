import * as types from './types';

export const updateThemeMode = (mode) => ({
  type: types.UPDATE_THEME_MODE,
  payload: mode
})