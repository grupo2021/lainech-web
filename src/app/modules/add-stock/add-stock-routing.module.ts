import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStockComponent } from './add-stock.component';
import { CartProcuctsComponent } from './pages/cart-procucts/cart-procucts.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { ProductViewStockComponent } from './pages/product-view-stock/product-view-stock.component';

const routes: Routes = [
  {
    path: '',
    component: AddStockComponent,
    children: [
      { path: 'products', component: ListProductsComponent },
      { path: 'cart', component: CartProcuctsComponent },
      { path: ':id', component: ProductViewStockComponent },
      { path: '', redirectTo: 'products' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddStockRoutingModule {}
