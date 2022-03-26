import { ActionReducerMap } from '@ngrx/store';
import {
  ProductsStockState,
  productStockReducer,
} from './reducers/add-stock.reducer';
import { authReducer, AuthState } from './reducers/auth.reducer';
import { sellReducer, SellState } from './reducers/sell.reducer';
import { productReducer, ProductState } from './reducers/product.reducer';
import { uiReducer, UiState } from './reducers/ui.reducer';
import { pendingReducer, PendingState } from './reducers/pending.reducer';

export interface AppState {
  auth: AuthState;
  ui: UiState;
  product: ProductState;
  productStock: ProductsStockState;
  sell: SellState;
  pending: PendingState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  ui: uiReducer,
  product: productReducer,
  productStock: productStockReducer,
  sell: sellReducer,
  pending: pendingReducer,
};
