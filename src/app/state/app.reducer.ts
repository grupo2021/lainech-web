import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './reducers/auth.reducer';
import { productReducer, ProductState } from './reducers/product.reducer';
import { uiReducer, UiState } from './reducers/ui.reducer';

export interface AppState {
  auth: AuthState;
  ui: UiState;
  product: ProductState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  ui: uiReducer,
  product: productReducer,
};
