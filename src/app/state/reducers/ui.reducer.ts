import { createReducer, on } from '@ngrx/store';
import { initLoading, stopLoading } from '../actions/ui.action';

export interface UiState {
  loading: boolean;
}

export const initialUiState: UiState = {
  loading: false,
};

const _uiReducer = createReducer(
  initialUiState,

  on(initLoading, () => ({
    loading: true,
  })),

  on(stopLoading, () => ({
    loading: false,
  }))
);

export function uiReducer(state: any, action: any) {
  return _uiReducer(state, action);
}
