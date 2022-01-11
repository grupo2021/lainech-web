import { createAction, props } from '@ngrx/store';
import { PreSell } from 'src/app/models/pre-sell.model';

export const addPreSell = createAction(
  '[SELL] add presell',
  props<{ preSell: PreSell }>()
);

export const removePreSell = createAction(
  '[SELL] remove presell',
  props<{ preSell: PreSell }>()
);

export const incrementPreSell = createAction(
  '[SELL] increment presell',
  props<{ preSell: PreSell }>()
);

export const decrementPreSell = createAction(
  '[SELL] decrement presell',
  props<{ preSell: PreSell }>()
);

export const cleanPreSell = createAction('[SELL] clean sell state');
