import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './reducers/auth.reducer';
import { uiReducer, UiState } from './reducers/ui.reducer';

export interface AppState {
  auth: AuthState;
  ui: UiState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  ui: uiReducer,
};
