import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const setUser = createAction(
  '[AUTH] Set user',
  props<{ user: User; access_token: string }>()
);

export const unsetUser = createAction('[AUTH] unset user');
