import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesEditComponent } from './pages/categories-edit/categories-edit.component';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { CategoriesNewComponent } from './pages/categories-new/categories-new.component';
import { CategoriesViewComponent } from './pages/categories-view/categories-view.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      { path: 'list', component: CategoriesListComponent },
      { path: 'new', component: CategoriesNewComponent },
      { path: ':id/view', component: CategoriesViewComponent },
      { path: ':id/edit', component: CategoriesEditComponent },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
