import { createReducer, on } from '@ngrx/store';
import { PreSell } from 'src/app/models/pre-sell.model';
import {
  addPreSell,
  cleanPreSell,
  decrementPreSell,
  incrementPreSell,
  removePreSell,
} from '../actions/sell.action';

export interface SellState {
  preSells: PreSell[];
  total: number;
  cant: number;
}

export const initialSellState: SellState = {
  preSells: [
    {
      id: 1,
      name: 'EUCALIPTUS',
      image:
        'https://res.cloudinary.com/dighalnuf/image/upload/v1639857583/in0hvdseamhmvlhqfcjs.png',
      price: 1,
      subtotal: 6,
      cant: 6,
    },
  ],
  total: 6,
  cant: 6,
};

const _sellReducer = createReducer(
  initialSellState,

  on(addPreSell, (state, { preSell }) => ({
    preSells: state.preSells.find((p) => p.id === preSell.id)
      ? state.preSells.map((p) =>
          p.id === preSell.id
            ? {
                ...p,
                subtotal: p.subtotal + preSell.cant * preSell.price,
                cant: p.cant + preSell.cant,
              }
            : p
        )
      : [...state.preSells, preSell],
    total: state.total + preSell.subtotal,
    cant: state.cant + preSell.cant,
  })),

  on(removePreSell, (state, { preSell }) => ({
    preSells: state.preSells.find((p) => p.id === preSell.id)
      ? state.preSells.find((p) => p.id === preSell.id)!.cant <= preSell.cant
        ? state.preSells.filter((p) => p.id !== preSell.id)
        : state.preSells.map((p) =>
            p.id === preSell.id
              ? {
                  ...p,
                  subtotal: p.subtotal - preSell.cant * preSell.price,
                  cant: p.cant - preSell.cant,
                }
              : p
          )
      : [...state.preSells],
    total: state.preSells.find((p) => p.id === preSell.id)
      ? state.preSells.find((p) => p.id === preSell.id)!.cant <= preSell.cant
        ? state.total -
          state.preSells.find((p) => p.id === preSell.id)!.subtotal
        : state.total - preSell.subtotal
      : state.total,
    cant: state.preSells.find((p) => p.id === preSell.id)
      ? state.preSells.find((p) => p.id === preSell.id)!.cant <= preSell.cant
        ? state.total - state.preSells.find((p) => p.id === preSell.id)!.cant
        : state.total - preSell.cant
      : state.total,
  })),

  on(incrementPreSell, (state, { preSell }) => ({
    preSells: state.preSells.map((p) =>
      p.id === preSell.id
        ? { ...p, cant: p.cant + 1, subtotal: p.subtotal + p.price }
        : p
    ),
    total: state.total + preSell.price,
    cant: state.cant + 1,
  })),

  on(decrementPreSell, (state, { preSell }) => ({
    preSells:
      preSell.cant == 1
        ? state.preSells.filter((p) => p.id != preSell.id)
        : state.preSells.map((p) =>
            p.id === preSell.id
              ? { ...p, cant: p.cant - 1, subtotal: p.subtotal - p.price }
              : p
          ),
    total: state.total - preSell.price,
    cant: state.cant - 1,
  })),

  on(cleanPreSell, (state) => ({
    preSells: [],
    total: 0,
    cant: 0,
  }))
);

export function sellReducer(state: any, action: any) {
  return _sellReducer(state, action);
}
