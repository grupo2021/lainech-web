import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
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
      {
        path: 'new',
        component: ClientsNewComponent,
        data: { roles: ['PROMOTOR'] },
        canActivate: [AuthGuard],
      },
      { path: ':id/view', component: ClientViewComponent },
      {
        path: ':id/edit',
        component: ClientEditComponent,
        data: { roles: ['PROMOTOR'] },
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
