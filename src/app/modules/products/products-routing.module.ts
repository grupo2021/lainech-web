import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductNewComponent } from './pages/product-new/product-new.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: 'list', component: ProductListComponent },
      { path: 'new', component: ProductNewComponent },
      {
        path: ':id',
        component: ProductViewComponent,
        children: [
          { path: 'detail', component: ProductDetailComponent },
          { path: 'edit', component: ProductEditComponent },
          { path: '', redirectTo: 'detail' },
        ],
      },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
