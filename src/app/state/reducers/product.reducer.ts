import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import {
  addLote,
  setProduct,
  unsetProduct,
  updateLote,
} from '../actions/product.action';

export interface ProductState {
  product: Product | null;
}

export const initialproductState: ProductState = {
  product: null,
};

const _productReducer = createReducer(
  initialproductState,

  on(setProduct, (state, { product }) => ({
    product,
  })),

  on(addLote, (state, { lote }) => ({
    ...state,
    product: { ...state.product!, lotes: [...state.product!.lotes, lote] },
  })),

  on(updateLote, (state, { lote }) => ({
    ...state,
    product: {
      ...state.product!,
      lotes: state.product!.lotes.map((l) => (l.id === lote.id ? lote : l)),
    },
  })),

  on(unsetProduct, () => ({
    product: null,
  }))
);

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}
