import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { DataReport } from 'src/app/models/data-report.model';
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

  public users: UserSmall[] = [];
  private usersSubs!: Subscription;

  public dataReport!: DataReport;
  public count = 0;
  private dataReportSubs!: Subscription;

  displayedColumns: string[] = ['date', 'details', 'total'];

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

    const { type, promotor } = this.form.value;

    if (initDate.getTime() > endDate.getTime()) {
      this.matDialog.open(AlertComponent, {
        data: {
          title: 'Error en la fechas',
          content: 'La fecha de fin tiene que se mayor a la de inicio',
        },
      });
    }
    this.store.dispatch(initLoading());
    this.reportService
      .generateReport(
        type,
        initDate.toISOString(),
        endDate.toISOString(),
        promotor
      )
      .subscribe(({ data, count }) => {
        this.store.dispatch(stopLoading());
        this.dataReport = data;
        this.count = count;
      });
  }

  ngOnDestroy(): void {
    this.usersSubs?.unsubscribe();
  }

  private createForm() {
    this.form = this.fb.group({
      type: ['', Validators.required],
      initDate: [new Date().toISOString(), Validators.required],
      endDate: [new Date().toISOString(), Validators.required],
      promotor: ['', Validators.required],
    });
  }
}
