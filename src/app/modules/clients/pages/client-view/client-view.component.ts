import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { User } from 'src/app/models/user.model';
import { ClientService } from 'src/app/services/client.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss'],
})
export class ClientViewComponent implements OnInit {
  public client!: Client;
  private clientSubs!: Subscription;

  public phones: string[] = [];

  public auth!: User | null;
  private authSubs!: Subscription;

  get isPromotor() {
    return this.auth?.role === 'PROMOTOR';
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.clientSubs = this.route.params
      .pipe(switchMap(({ id }) => this.clientService.findOne(id)))
      .subscribe((res) => {
        this.client = res;
        this.phones = JSON.parse(res.phones);
        this.store.dispatch(stopLoading());
      });

    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
    });
  }

  ngOnDestroy(): void {
    this.clientSubs?.unsubscribe();
    this.authSubs?.unsubscribe();
  }
}
