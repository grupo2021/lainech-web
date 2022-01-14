import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { CandelDialogComponent } from 'src/app/layouts/candel-dialog/candel-dialog.component';
import { ConfirmDialogComponent } from 'src/app/layouts/confirm-dialog/confirm-dialog.component';
import { Reload } from 'src/app/models/reload.model';
import { User } from 'src/app/models/user.model';
import { ReloadService } from 'src/app/services/reload.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-reload-view',
  templateUrl: './reload-view.component.html',
  styleUrls: ['./reload-view.component.scss'],
})
export class ReloadViewComponent implements OnInit, OnDestroy {
  public reload!: Reload;
  private reloadSubs!: Subscription;

  private user!: User | null;
  private userSubs!: Subscription;

  get colorStatus() {
    switch (this.reload.status) {
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

  constructor(
    private route: ActivatedRoute,
    private reloadService: ReloadService,
    private store: Store<AppState>,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.reloadSubs = this.route.params
      .pipe(switchMap(({ id }) => this.reloadService.getOne(id)))
      .subscribe((res) => {
        this.reload = res;
        this.store.dispatch(stopLoading());
      });

    this.userSubs = this.store.select('auth').subscribe(({ user }) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.reloadSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

  approveReload() {
    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        content:
          'Esta acción es irreversible, ¿esta seguro de aprobar esta solidud?',
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.store.dispatch(initLoading());
        this.reloadService.approve(this.reload.id).subscribe({
          next: (res) => {
            this.store.dispatch(stopLoading());
            this.reload = res;
          },
          error: (e) => {
            this.store.dispatch(stopLoading());
            const errors = e.error.messages as string[];
            this.matDialog.open(AlertComponent, {
              data: {
                title: 'No se completo la transacción',
                content: errors?.join('. '),
              },
            });
          },
        });
      }
    });
  }

  cancelledReload() {
    const dialog = this.matDialog.open(CandelDialogComponent);

    dialog.afterClosed().subscribe((description) => {
      if (description === undefined) {
        this.matDialog.open(AlertComponent, {
          data: {
            title: 'Oops',
            content: 'La descripcion es obligatoria para anular esta solicitud',
          },
        });
        return;
      }

      if (!description) {
        return;
      }

      if (description) {
        const dialog = this.matDialog.open(ConfirmDialogComponent, {
          data: {
            content:
              'Esta acción es irreversible, ¿esta seguro de anular esta solidud?',
          },
        });

        dialog.afterClosed().subscribe((res) => {
          if (res) {
            this.store.dispatch(initLoading());
            this.reloadService
              .cancelled(this.reload.id, description)
              .subscribe({
                next: (res) => {
                  this.store.dispatch(stopLoading());
                  this.reload = res;
                },
                error: (e) => {
                  this.store.dispatch(stopLoading());
                  const errors = e.error.messages as string[];
                  this.matDialog.open(AlertComponent, {
                    data: {
                      title: 'No se completo la transacción',
                      content: errors?.join('. '),
                    },
                  });
                },
              });
          }
        });
      }
    });
  }
}
