import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotorProductRoutingModule } from './promotor-product-routing.module';
import { PromotorProductComponent } from './promotor-product.component';
import { PromotorProductListComponent } from './pages/promotor-product-list/promotor-product-list.component';
import { PromotorProductViewComponent } from './pages/promotor-product-view/promotor-product-view.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PromotorProductComponent,
    PromotorProductListComponent,
    PromotorProductViewComponent,
  ],
  imports: [
    CommonModule,
    PromotorProductRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class PromotorProductModule {}
