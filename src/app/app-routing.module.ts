import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.module').then(
        (m) => m.ProductsModule
      ),
    data: { roles: ['ADMIN', 'ALMACENERO'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
    data: { roles: ['ADMIN'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'clients',
    loadChildren: () =>
      import('./modules/clients/clients.module').then((m) => m.ClientsModule),
    data: { roles: ['ADMIN', 'PROMOTOR'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'categories',
    loadChildren: () =>
      import('./modules/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
    data: { roles: ['ADMIN'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'add-stock',
    loadChildren: () =>
      import('./modules/add-stock/add-stock.module').then(
        (m) => m.AddStockModule
      ),
    data: { roles: ['PROMOTOR'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'reload',
    loadChildren: () =>
      import('./modules/reload/reload.module').then((m) => m.ReloadModule),
    data: { roles: ['ADMIN', 'PROMOTOR', 'ALMACENERO'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'promotor-product',
    loadChildren: () =>
      import('./modules/promotor-product/promotor-product.module').then(
        (m) => m.PromotorProductModule
      ),
    data: { roles: ['PROMOTOR'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'sell',
    loadChildren: () =>
      import('./modules/sell/sell.module').then((m) => m.SellModule),
    data: { roles: ['PROMOTOR'] },
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
