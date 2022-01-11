import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellCartComponent } from './pages/sell-cart/sell-cart.component';
import { SellConfirmComponent } from './pages/sell-confirm/sell-confirm.component';
import { SellListComponent } from './pages/sell-list/sell-list.component';
import { SellProductViewComponent } from './pages/sell-product-view/sell-product-view.component';
import { SellComponent } from './sell.component';

const routes: Routes = [
  {
    path: '',
    component: SellComponent,
    children: [
      { path: 'list', component: SellListComponent },
      { path: 'cart', component: SellCartComponent },
      { path: 'confirm', component: SellConfirmComponent },
      { path: ':id', component: SellProductViewComponent },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellRoutingModule {}
