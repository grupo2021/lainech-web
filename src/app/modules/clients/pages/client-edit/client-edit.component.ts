import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
})
export class ClientEditComponent implements OnInit, OnDestroy {
  public client!: Client;
  private clientSubs!: Subscription;

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
        this.store.dispatch(stopLoading());
        this.client = res;
      });
  }

  ngOnDestroy(): void {
    this.clientSubs?.unsubscribe();
  }
}
