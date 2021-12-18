import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { setUser, unsetUser } from '../actions/auth.action';

export interface AuthState {
  user: User | null;
  access_token: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  access_token: null,
};

const _authReducer = createReducer(
  initialAuthState,

  on(setUser, (state, { user, access_token }) => ({
    user,
    access_token,
  })),

  on(unsetUser, () => ({
    user: null,
    access_token: null,
  }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
