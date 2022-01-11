import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellRoutingModule } from './sell-routing.module';
import { SellComponent } from './sell.component';
import { SellListComponent } from './pages/sell-list/sell-list.component';
import { SellCartComponent } from './pages/sell-cart/sell-cart.component';
import { SellConfirmComponent } from './pages/sell-confirm/sell-confirm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { SellProductComponent } from './components/sell-product/sell-product.component';
import { SellCartProductComponent } from './components/sell-cart-product/sell-cart-product.component';
import { SellProductViewComponent } from './pages/sell-product-view/sell-product-view.component';

@NgModule({
  declarations: [
    SellComponent,
    SellListComponent,
    SellCartComponent,
    SellConfirmComponent,
    SellProductComponent,
    SellCartProductComponent,
    SellProductViewComponent,
  ],
  imports: [
    CommonModule,
    SellRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
})
export class SellModule {}
