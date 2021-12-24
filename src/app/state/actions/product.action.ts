import { createAction, props } from '@ngrx/store';
import { Lote } from 'src/app/models/lote.model';
import { Product } from 'src/app/models/product.model';

export const setProduct = createAction(
  '[PRODUCT-VIEW] Set product',
  props<{ product: Product }>()
);

export const addLote = createAction(
  '[PRODUCT-VIEW] add lote to product',
  props<{ lote: Lote }>()
);

export const updateLote = createAction(
  '[PRODUCT-VIEW] update lote on product',
  props<{ lote: Lote }>()
);

export const unsetProduct = createAction('[PRODUCT-VIEW] Unset products');
