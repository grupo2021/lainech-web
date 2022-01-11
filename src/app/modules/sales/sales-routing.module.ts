import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesListComponent } from './pages/sales-list/sales-list.component';
import { SalesViewComponent } from './pages/sales-view/sales-view.component';
import { SalesComponent } from './sales.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      { path: 'list', component: SalesListComponent },
      { path: ':id', component: SalesViewComponent },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
