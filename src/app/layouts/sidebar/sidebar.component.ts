import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public auth!: User | null;

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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
    });
  }

  ngOnDestroy(): void {
    this.authSubs?.unsubscribe();
  }
}
