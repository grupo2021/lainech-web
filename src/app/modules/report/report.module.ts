import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportResultComponent } from './pages/report-result/report-result.component';
import { ReportGenerateComponent } from './pages/report-generate/report-generate.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportSalesComponent } from './components/report-sales/report-sales.component';
import { ReportBestSalesComponent } from './components/report-best-sales/report-best-sales.component';
import { ReportReloadsComponent } from './components/report-reloads/report-reloads.component';
import { ReportReturnsComponent } from './components/report-returns/report-returns.component';
import { ReportBestProductComponent } from './components/report-best-product/report-best-product.component';

@NgModule({
  declarations: [
    ReportComponent,
    ReportResultComponent,
    ReportGenerateComponent,
    ReportListComponent,
    ReportSalesComponent,
    ReportBestSalesComponent,
    ReportReloadsComponent,
    ReportReturnsComponent,
    ReportBestProductComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class ReportModule {}
