import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReloadListComponent } from './pages/reload-list/reload-list.component';
import { ReloadViewComponent } from './pages/reload-view/reload-view.component';
import { ReloadComponent } from './reload.component';

const routes: Routes = [
  {
    path: '',
    component: ReloadComponent,
    children: [
      { path: 'list', component: ReloadListComponent },
      { path: ':id', component: ReloadViewComponent },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReloadRoutingModule {}
