import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss'],
})
export class ReturnsComponent implements OnInit, OnDestroy {
  private auth!: User | null;
  private authSubs!: Subscription;

  get isPromotor() {
    return this.auth?.role === 'PROMOTOR';
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authSubs = this.store
      .select('auth')
      .subscribe(({ user }) => (this.auth = user));
  }

  ngOnDestroy(): void {
    this.authSubs?.unsubscribe();
  }
}
