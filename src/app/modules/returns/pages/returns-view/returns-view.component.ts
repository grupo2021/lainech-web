import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { CandelDialogComponent } from 'src/app/layouts/candel-dialog/candel-dialog.component';
import { ConfirmDialogComponent } from 'src/app/layouts/confirm-dialog/confirm-dialog.component';
import { Returns } from 'src/app/models/returns.model';
import { User } from 'src/app/models/user.model';
import { ReturnsService } from 'src/app/services/returns.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-returns-view',
  templateUrl: './returns-view.component.html',
  styleUrls: ['./returns-view.component.scss'],
})
export class ReturnsViewComponent implements OnInit, OnDestroy {
  public returns!: Returns;
  private returnsSubs!: Subscription;

  private auth!: User | null;
  private authSubs!: Subscription;

  get chipColor() {
    let color = 'primary';
    switch (this.returns.status) {
      case 'APROBADO':
        color = 'accent';
        break;
      case 'ANULADO':
        color = 'warn';
        break;
    }
    return color;
  }

  get isPromotor() {
    return this.auth?.role === 'PROMOTOR';
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private returnsService: ReturnsService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
    });
    this.store.dispatch(initLoading());
    this.returnsSubs = this.route.params
      .pipe(switchMap(({ id }) => this.returnsService.findOne(id)))
      .subscribe({
        next: (res) => {
          this.store.dispatch(stopLoading());
          this.returns = res;
        },
        error: (e) => {
          this.store.dispatch(stopLoading());
          this.matDialog.open(AlertComponent, {
            data: {
              title: 'Oops',
              content: e.error.messages
                ? e.error.messages.join('. ')
                : 'Vuelva a interntar',
            },
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.returnsSubs?.unsubscribe();
  }

  public approve() {
    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      data: { content: '¿Está seguro de aprobar esta devolución?' },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(initLoading());
        this.returnsService
          .changeStatus(this.returns.id, 'APROBADO')
          .subscribe({
            next: (res) => {
              this.store.dispatch(stopLoading());
              this.returns = res;
            },
            error: (e) => {
              this.store.dispatch(stopLoading());
              this.matDialog.open(AlertComponent, {
                data: {
                  title: 'Acción no permitida',
                  content: e.error.messages.join('. '),
                },
              });
            },
          });
      }
    });
  }

  public cancelled() {
    const dialog = this.matDialog.open(CandelDialogComponent, {
      data: { content: '¿Está seguro de anular esta devolución?' },
    });

    dialog.afterClosed().subscribe((description) => {
      if (description === undefined) {
        this.matDialog.open(AlertComponent, {
          data: {
            title: 'Oops',
            content: 'El motivo es obligatorio para anular esta devolución.',
          },
        });
        return;
      }

      if (!description) {
        return;
      }
      if (description) {
        this.store.dispatch(initLoading());
        this.returnsService
          .changeStatus(this.returns.id, 'ANULADO', description)
          .subscribe({
            next: (res) => {
              this.store.dispatch(stopLoading());
              this.returns = res;
            },
            error: (e) => {
              this.store.dispatch(stopLoading());
              this.matDialog.open(AlertComponent, {
                data: {
                  title: 'Acción no permitida',
                  content: e.error.messages.join('. '),
                },
              });
            },
          });
      }
    });
  }
}
