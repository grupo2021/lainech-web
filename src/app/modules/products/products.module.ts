import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductNewComponent } from './pages/product-new/product-new.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { ProductsImageComponent } from './components/products-image/products-image.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductLoteFormComponent } from './components/product-lote-form/product-lote-form.component';
import { ProductLotesListComponent } from './pages/product-lotes-list/product-lotes-list.component';
import { ProductLotesNewComponent } from './pages/product-lotes-new/product-lotes-new.component';
import { ProductLotesEditComponent } from './pages/product-lotes-edit/product-lotes-edit.component';
import { CantAcumPipe } from './pipes/cant-acum.pipe';
import { CantOutAcumPipe } from './pipes/cant-out-acum.pipe';
import { CantOutAvailablePipe } from './pipes/cant-out-available.pipe';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductNewComponent,
    ProductViewComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductsFormComponent,
    ProductsImageComponent,
    ProductLoteFormComponent,
    ProductLotesListComponent,
    ProductLotesNewComponent,
    ProductLotesEditComponent,
    CantAcumPipe,
    CantOutAcumPipe,
    CantOutAvailablePipe,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
})
export class ProductsModule {}
