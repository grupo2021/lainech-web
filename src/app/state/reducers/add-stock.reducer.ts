import { createReducer, on } from '@ngrx/store';
import { ProductStock } from 'src/app/models/add-stock';
import {
  addProduct,
  cleanstock,
  decrementProduct,
  incrementProduct,
  removeProduct,
} from '../actions/add-stock.action';

export interface ProductsStockState {
  products: ProductStock[];
  total: number;
  cant: number;
}

export const initialProductsStockState: ProductsStockState = {
  products: [],
  total: 0,
  cant: 0,
};

const _productStockReducer = createReducer(
  initialProductsStockState,

  on(addProduct, (state, { productStock }) => ({
    products: state.products.find((p) => p.id === productStock.id)
      ? state.products.map((p) =>
          p.id === productStock.id
            ? {
                ...p,
                subtotal: p.subtotal + productStock.cant * productStock.price,
                cant: p.cant + productStock.cant,
              }
            : p
        )
      : [...state.products, productStock],
    total: state.total + productStock.subtotal,
    cant: state.cant + productStock.cant,
  })),

  on(removeProduct, (state, { productStock }) => ({
    products: state.products.filter((p) => p.id !== productStock.id),
    total: state.products.find((p) => p.id === productStock.id)
      ? state.total -
        state.products.find((p) => p.id === productStock.id)!.subtotal
      : state.total,
    cant: state.products.find((p) => p.id === productStock.id)
      ? state.cant - state.products.find((p) => p.id === productStock.id)!.cant
      : state.cant,
  })),

  on(incrementProduct, (state, { productStock }) => ({
    products: state.products.map((p) =>
      p.id === productStock.id
        ? { ...p, cant: p.cant + 1, subtotal: p.subtotal + p.price }
        : p
    ),
    total: state.total + productStock.price,
    cant: state.cant + 1,
  })),

  on(decrementProduct, (state, { productStock }) => ({
    products:
      productStock.cant == 1
        ? state.products.filter((p) => p.id != productStock.id)
        : state.products.map((p) =>
            p.id === productStock.id
              ? { ...p, cant: p.cant - 1, subtotal: p.subtotal - p.price }
              : p
          ),
    total: state.total - productStock.price,
    cant: state.cant - 1,
  })),

  on(cleanstock, (state) => ({
    products: [],
    total: 0,
    cant: 0,
  }))
);

export function productStockReducer(state: any, action: any) {
  return _productStockReducer(state, action);
}
