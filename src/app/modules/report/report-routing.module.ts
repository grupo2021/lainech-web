import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportGenerateComponent } from './pages/report-generate/report-generate.component';
import { ReportResultComponent } from './pages/report-result/report-result.component';
import { ReportComponent } from './report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      { path: 'generate', component: ReportGenerateComponent },
      { path: 'result', component: ReportResultComponent },
      { path: '', redirectTo: 'generate' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
