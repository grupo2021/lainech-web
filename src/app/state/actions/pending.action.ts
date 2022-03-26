import { createAction, props } from '@ngrx/store';

export const setPending = createAction(
  '[PENDING] set pending',
  props<{ pendingType: 'reloads' | 'sells' | 'devolutions'; cant: number }>()
);

export const substractPending = createAction(
  '[PENDING]  subtract pending',
  props<{ pendingType: 'reloads' | 'sells' | 'devolutions' }>()
);

export const unsetPending = createAction('[PENDING] unset pending');
