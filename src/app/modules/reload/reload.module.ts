import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReloadRoutingModule } from './reload-routing.module';
import { ReloadComponent } from './reload.component';
import { ReloadListComponent } from './pages/reload-list/reload-list.component';
import { ReloadViewComponent } from './pages/reload-view/reload-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ReloadComponent, ReloadListComponent, ReloadViewComponent],
  imports: [
    CommonModule,
    ReloadRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
})
export class ReloadModule {}
