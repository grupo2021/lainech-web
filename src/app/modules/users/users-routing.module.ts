import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersEditComponent } from './pages/users-edit/users-edit.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UsersNewComponent } from './pages/users-new/users-new.component';
import { UsersRenewComponent } from './pages/users-renew/users-renew.component';
import { UsersViewComponent } from './pages/users-view/users-view.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'list', component: UsersListComponent },
      { path: 'new', component: UsersNewComponent },
      { path: ':id/view', component: UsersViewComponent },
      { path: ':id/edit', component: UsersEditComponent },
      { path: ':id/renew', component: UsersRenewComponent },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
