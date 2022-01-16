import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { PreSell } from 'src/app/models/pre-sell.model';
import { PromotorProduct } from 'src/app/models/promotor-product.model';
import { PromotorProductService } from 'src/app/services/promotor-product.service';
import { addPreSell, removePreSell } from 'src/app/state/actions/sell.action';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-sell-product-view',
  templateUrl: './sell-product-view.component.html',
  styleUrls: ['./sell-product-view.component.scss'],
})
export class SellProductViewComponent implements OnInit, OnDestroy {
  public product!: PromotorProduct;
  private productSubs!: Subscription;

  public cant = 0;
  private preSellSubs!: Subscription;

  cantInput = new FormControl(6, [
    Validators.required,
    Validators.min(1),
    Validators.max(9999),
  ]);

  cantOutInput = new FormControl(6, [
    Validators.required,
    Validators.min(1),
    Validators.max(99999),
  ]);

  constructor(
    private route: ActivatedRoute,
    private promotorProductService: PromotorProductService,
    private store: Store<AppState>,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.productSubs = this.route.params
      .pipe(switchMap(({ id }) => this.promotorProductService.getOne(id)))
      .subscribe({
        next: (res) => {
          this.product = res;
          this.store.dispatch(stopLoading());
        },
        error: (e) => {
          this.store.dispatch(stopLoading());
          this.router.navigate(['/sell']).then(() => {
            this.matDialog.open(AlertComponent, {
              data: {
                title: 'Oops...',
                content:
                  'Estas tratando de ingresar a un recurso que no te pertenece.',
              },
            });
          });
        },
      });

    this.preSellSubs = this.store
      .select('sell')
      .subscribe(({ cant }) => (this.cant = cant));
  }

  ngOnDestroy(): void {
    this.productSubs?.unsubscribe();
    this.preSellSubs?.unsubscribe();
  }

  addPreSell() {
    if (this.cantInput.valid) {
      this.store.dispatch(
        addPreSell({
          preSell: PreSell.fromPromotorProduct(
            this.product,
            this.cantInput.value
          ),
        })
      );
    }
  }

  removePreSell() {
    if (this.cantOutInput.valid) {
      this.store.dispatch(
        removePreSell({
          preSell: PreSell.fromPromotorProduct(
            this.product,
            this.cantOutInput.value
          ),
        })
      );
    }
  }
}
