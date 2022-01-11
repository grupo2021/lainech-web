import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { SalesListComponent } from './pages/sales-list/sales-list.component';
import { SalesViewComponent } from './pages/sales-view/sales-view.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SalesComponent, SalesListComponent, SalesViewComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class SalesModule {}
