import { createAction, props } from '@ngrx/store';
import { ProductStock } from 'src/app/models/add-stock';

export const addProduct = createAction(
  '[STOCK] add product to stock',
  props<{ productStock: ProductStock }>()
);

export const removeProduct = createAction(
  '[STOCK] remove product from stock',
  props<{ productStock: ProductStock }>()
);

export const incrementProduct = createAction(
  '[STOCK] increment product in stock',
  props<{ productStock: ProductStock }>()
);

export const decrementProduct = createAction(
  '[STOCK] decrement product in stock',
  props<{ productStock: ProductStock }>()
);

export const cleanstock = createAction('[STOCK] cleanSstock');
