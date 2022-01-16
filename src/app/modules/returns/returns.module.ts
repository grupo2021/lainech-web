import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnsRoutingModule } from './returns-routing.module';
import { ReturnsComponent } from './returns.component';
import { ReturnsNewComponent } from './pages/returns-new/returns-new.component';
import { ReturnsListComponent } from './pages/returns-list/returns-list.component';
import { ReturnsViewComponent } from './pages/returns-view/returns-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReturnsProductComponent } from './components/returns-product/returns-product.component';

@NgModule({
  declarations: [
    ReturnsComponent,
    ReturnsNewComponent,
    ReturnsListComponent,
    ReturnsViewComponent,
    ReturnsProductComponent,
  ],
  imports: [
    CommonModule,
    ReturnsRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
})
export class ReturnsModule {}
