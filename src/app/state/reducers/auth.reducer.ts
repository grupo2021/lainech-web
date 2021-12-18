// import { createReducer, on } from '@ngrx/store';
// import { User } from 'src/app/models/user.model';
// import {
//   signin,
//   setUser,
//   setError,
//   signout,
//   unsetUser,
//   renew,
// } from '../actions/auth.action';

// export interface AuthState {
//   user: User | null;
//   access_token: string | null;
//   loading: boolean;
//   error: any;
// }

// export const initialAuthState: AuthState = {
//   user: null,
//   access_token: null,
//   loading: false,
//   error: null,
// };

// const _authReducer = createReducer(
//   initialAuthState,

//   on(signin, () => ({
//     user: null,
//     access_token: null,
//     loading: true,
//     error: null,
//   })),

//   on(setUser, (state, { user, access_token }) => ({
//     user,
//     access_token,
//     loading: false,
//     error: null,
//   })),

//   on(setError, (state, { e }) => ({
//     user: null,
//     access_token: null,
//     loading: false,
//     error: e.error,
//   })),

//   on(signout, (state) => ({
//     ...state,
//     loading: true,
//   })),

//   on(renew, (state) => ({
//     ...state,
//     loading: true,
//   })),

//   on(unsetUser, () => ({
//     user: null,
//     access_token: null,
//     loading: false,
//     error: null,
//   }))
// );

// export function authReducer(state: any, action: any) {
//   return _authReducer(state, action);
// }
