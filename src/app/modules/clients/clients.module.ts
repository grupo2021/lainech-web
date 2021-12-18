import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientsNewComponent } from './pages/clients-new/clients-new.component';
import { ClientViewComponent } from './pages/client-view/client-view.component';
import { ClientEditComponent } from './pages/client-edit/client-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientFormComponent } from './components/client-form/client-form.component';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientsListComponent,
    ClientsNewComponent,
    ClientViewComponent,
    ClientEditComponent,
    ClientFormComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
})
export class ClientsModule {}
