import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientEditComponent } from './pages/client-edit/client-edit.component';
import { ClientViewComponent } from './pages/client-view/client-view.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientsNewComponent } from './pages/clients-new/clients-new.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      { path: 'list', component: ClientsListComponent },
      { path: 'new', component: ClientsNewComponent },
      { path: ':id/view', component: ClientViewComponent },
      { path: ':id/edit', component: ClientEditComponent },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
