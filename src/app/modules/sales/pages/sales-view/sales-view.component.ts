import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { ConfirmDialogComponent } from 'src/app/layouts/confirm-dialog/confirm-dialog.component';
import { Sale } from 'src/app/models/sale.model';
import { User } from 'src/app/models/user.model';
import { SaleService } from 'src/app/services/sale.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss'],
})
export class SalesViewComponent implements OnInit, OnDestroy {
  public sale!: Sale;
  private saleSubs!: Subscription;

  private user!: User | null;
  private userSubs!: Subscription;

  get colorStatus() {
    switch (this.sale.status) {
      case 'PENDIENTE':
        return 'accent';

      case 'APROBADO':
        return 'primary';

      case 'ANULADO':
        return 'warn';

      default:
        return 'primary';
    }
  }

  get isAdmin() {
    return this.user?.role === 'ADMIN';
  }

  get isAlmacenero() {
    return this.user?.role === 'ALMACENERO';
  }

  get isPromotor() {
    return this.user?.role === 'PROMOTOR';
  }

  constructor(
    private store: Store<AppState>,
    private saleService: SaleService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.saleSubs = this.route.params
      .pipe(switchMap(({ id }) => this.saleService.getOne(id)))
      .subscribe({
        next: (res) => this.handledSuccesss(res),
        error: (e) => this.handledError(e),
      });

    this.userSubs = this.store.select('auth').subscribe(({ user }) => {
      this.user = user;
    });
  }

  private handledSuccesss(res: Sale) {
    this.store.dispatch(stopLoading());
    this.sale = res;
  }

  private handledError(e: any) {
    this.store.dispatch(stopLoading());
    this.router.navigate(['sales']).then(() => {
      this.matDialog.open(AlertComponent, {
        data: {
          title: 'Acceso Restringido',
          content: 'No tienes los privilegios suficientes para este recurso!',
        },
      });
    });
  }

  public cancelled() {
    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      data: { content: 'Esta seguro de anular esta venta?' },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.store.dispatch(initLoading());
        this.saleService.cancelled(this.sale.id).subscribe({
          next: (res) => {
            this.store.dispatch(stopLoading());
            this.sale = res;
          },
          error: (e) => {
            this.store.dispatch(stopLoading());
            this.matDialog.open(AlertComponent, {
              data: {
                title: 'Ocurrio un error',
                content: e.error.messages.join('. '),
              },
            });
          },
        });
      }
    });
  }

  public approve() {
    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      data: { content: 'Esta seguro de aprobar esta venta?' },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.store.dispatch(initLoading());
        this.saleService.approve(this.sale.id).subscribe({
          next: (res) => {
            this.store.dispatch(stopLoading());
            this.sale = res;
          },
          error: (e) => {
            this.store.dispatch(stopLoading());
            this.matDialog.open(AlertComponent, {
              data: {
                title: 'Ocurrio un error',
                content: e.error.messages.join('. '),
              },
            });
          },
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.saleSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }
}
