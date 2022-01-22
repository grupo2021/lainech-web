import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { BestSaleReport } from 'src/app/models/best-sale-report.model';
import { DataReport } from 'src/app/models/data-report.model';
import { ReloadReport } from 'src/app/models/reaload-report.model';
import { ReturnsReport } from 'src/app/models/returns-report.model';
import { SaleReport } from 'src/app/models/sale-report.model';
import { UserSmall } from 'src/app/models/user-small.model';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-report-generate',
  templateUrl: './report-generate.component.html',
  styleUrls: ['./report-generate.component.scss'],
})
export class ReportGenerateComponent implements OnInit {
  public form!: FormGroup;

  isDisabledStatus = false;

  public users: UserSmall[] = [];
  private usersSubs!: Subscription;

  public saleReports!: SaleReport[] | null;
  public bestSaleReports!: BestSaleReport[] | null;
  public realoadReports!: ReloadReport[] | null;
  public returnsReports!: ReturnsReport[] | null;
  private reportSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private userService: UserService,
    private matDialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.store.dispatch(initLoading());
    this.usersSubs = this.userService.getPromotors().subscribe((res) => {
      this.store.dispatch(stopLoading());
      this.users = res;
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const initDate = new Date(
      new Date(this.form.get('initDate')?.value).setHours(0, 0, 1, 0)
    );
    const endDate = new Date(
      new Date(this.form.get('endDate')?.value).setHours(23, 59, 59, 0)
    );

    const { type, promotor, status } = this.form.value;

    if (initDate.getTime() > endDate.getTime()) {
      this.matDialog.open(AlertComponent, {
        data: {
          title: 'Error en la fechas',
          content: 'La fecha de fin tiene que se mayor a la de inicio',
        },
      });
    }
    this.setNullResponses();
    this.store.dispatch(initLoading());
    this.reportSubs = this.reportService
      .generateReport(
        type,
        initDate.toISOString(),
        endDate.toISOString(),
        promotor,
        status
      )
      .subscribe(({ data, count, type }) => {
        this.store.dispatch(stopLoading());
        if (type === 'SALES') {
          this.saleReports = data;
        } else if (type === 'BEST_SALE') {
          this.bestSaleReports = data;
        } else if (type === 'RELOADS') {
          this.realoadReports = data;
        } else if (type === 'RETURNS') {
          this.returnsReports = data;
        }
      });
  }

  ngOnDestroy(): void {
    this.usersSubs?.unsubscribe();
    this.reportSubs?.unsubscribe();
  }

  private createForm() {
    this.form = this.fb.group({
      type: ['VENTAS', Validators.required],
      status: ['ALL', Validators.required],
      initDate: [new Date().toISOString(), Validators.required],
      endDate: [new Date().toISOString(), Validators.required],
      promotor: ['0', Validators.required],
    });
  }

  private setNullResponses() {
    this.bestSaleReports = null;
    this.saleReports = null;
    this.realoadReports = null;
    this.returnsReports = null;
  }
}
