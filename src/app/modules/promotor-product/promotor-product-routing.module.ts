import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotorProductListComponent } from './pages/promotor-product-list/promotor-product-list.component';
import { PromotorProductViewComponent } from './pages/promotor-product-view/promotor-product-view.component';
import { PromotorProductComponent } from './promotor-product.component';

const routes: Routes = [
  {
    path: '',
    component: PromotorProductComponent,
    children: [
      { path: 'list', component: PromotorProductListComponent },
      { path: ':id', component: PromotorProductViewComponent },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotorProductRoutingModule {}
