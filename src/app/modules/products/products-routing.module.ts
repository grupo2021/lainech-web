import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductLotesEditComponent } from './pages/product-lotes-edit/product-lotes-edit.component';
import { ProductLotesListComponent } from './pages/product-lotes-list/product-lotes-list.component';
import { ProductLotesNewComponent } from './pages/product-lotes-new/product-lotes-new.component';
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
      { path: ':id/edit', component: ProductEditComponent },
      {
        path: ':id/view',
        component: ProductViewComponent,
        children: [
          { path: 'lotes', component: ProductLotesListComponent },
          { path: 'new', component: ProductLotesNewComponent },
          { path: ':id', component: ProductLotesEditComponent },
          { path: '', redirectTo: 'lotes' },
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
