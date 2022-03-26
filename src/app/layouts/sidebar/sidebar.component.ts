import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ReloadService } from 'src/app/services/reload.service';
import { ReturnsService } from 'src/app/services/returns.service';
import { SaleService } from 'src/app/services/sale.service';
import { setPending } from 'src/app/state/actions/pending.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public auth!: User | null;

  public reloadPendings: number = 0;
  public salesPendings: number = 0;
  public returnsPendings: number = 0;

  private pendingSubs?: Subscription;

  private authSubs!: Subscription;

  get isAdmin() {
    return this.auth?.role === 'ADMIN';
  }

  get isAlmacenero() {
    return this.auth?.role === 'ALMACENERO';
  }

  get isPromotor() {
    return this.auth?.role === 'PROMOTOR';
  }

  constructor(
    private store: Store<AppState>,
    private reloadService: ReloadService,
    private saleService: SaleService,
    private returnService: ReturnsService
  ) {}

  ngOnInit(): void {
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
      const id = this.auth?.role === 'ADMIN' ? 0 : this.auth!.id;
      this.reloadService.getPendings(id).subscribe((value) => {
        console.log({ value });
        this.store.dispatch(
          setPending({ pendingType: 'reloads', cant: value })
        );
      });
    });

    this.saleService.pendingCount().subscribe((value) => {
      this.store.dispatch(setPending({ pendingType: 'sells', cant: value }));
    });

    this.returnService.getPendings().subscribe((value) => {
      this.store.dispatch(
        setPending({ pendingType: 'devolutions', cant: value })
      );
    });

    this.pendingSubs = this.store
      .select('pending')
      .subscribe(({ reloads, sells, devolutions }) => {
        this.reloadPendings = reloads;
        this.salesPendings = sells;
        this.returnsPendings = devolutions;
      });
  }

  ngOnDestroy(): void {
    this.authSubs?.unsubscribe();
    this.pendingSubs?.unsubscribe();
  }
}
