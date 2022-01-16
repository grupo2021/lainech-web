import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ReturnsListComponent } from './pages/returns-list/returns-list.component';
import { ReturnsNewComponent } from './pages/returns-new/returns-new.component';
import { ReturnsViewComponent } from './pages/returns-view/returns-view.component';
import { ReturnsComponent } from './returns.component';

const routes: Routes = [
  {
    path: '',
    component: ReturnsComponent,
    children: [
      { path: 'list', component: ReturnsListComponent },
      {
        path: 'new',
        component: ReturnsNewComponent,
        data: { roles: ['PROMOTOR'] },
        canActivate: [AuthGuard],
      },
      { path: ':id', component: ReturnsViewComponent },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnsRoutingModule {}
