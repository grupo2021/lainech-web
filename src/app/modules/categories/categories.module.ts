import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesNewComponent } from './pages/categories-new/categories-new.component';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { CategoriesEditComponent } from './pages/categories-edit/categories-edit.component';
import { CategoriesViewComponent } from './pages/categories-view/categories-view.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesNewComponent,
    CategoriesListComponent,
    CategoriesEditComponent,
    CategoriesViewComponent,
    CategoriesFormComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
})
export class CategoriesModule {}
