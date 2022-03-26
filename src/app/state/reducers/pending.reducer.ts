import { createReducer, on } from '@ngrx/store';

import {
  setPending,
  unsetPending,
  substractPending,
} from '../actions/pending.action';

export interface PendingState {
  sells: number;
  devolutions: number;
  reloads: number;
}

export const initialPendingState: PendingState = {
  sells: 0,
  devolutions: 0,
  reloads: 0,
};

const _pendingReducer = createReducer(
  initialPendingState,

  on(setPending, (state, { pendingType, cant }) => ({
    ...state,
    sells: pendingType === 'sells' ? cant : state.sells,
    devolutions: pendingType === 'devolutions' ? cant : state.devolutions,
    reloads: pendingType === 'reloads' ? cant : state.reloads,
  })),

  on(substractPending, (state, { pendingType }) => ({
    ...state,
    sells: pendingType === 'sells' ? state.sells - 1 : state.sells,
    devolutions:
      pendingType === 'devolutions' ? state.devolutions - 1 : state.devolutions,
    reloads: pendingType === 'reloads' ? state.reloads - 1 : state.reloads,
  })),

  on(unsetPending, () => ({
    sells: 0,
    devolutions: 0,
    reloads: 0,
  }))
);

export function pendingReducer(state: any, action: any) {
  return _pendingReducer(state, action);
}
