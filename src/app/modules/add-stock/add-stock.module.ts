import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStockRoutingModule } from './add-stock-routing.module';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { CartProcuctsComponent } from './pages/cart-procucts/cart-procucts.component';
import { AddStockComponent } from './add-stock.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ListProductsComponent,
    CartProcuctsComponent,
    AddStockComponent,
  ],
  imports: [
    CommonModule,
    AddStockRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
})
export class AddStockModule {}
