import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';
import { setUser } from './state/actions/auth.action';
import { initLoading, stopLoading } from './state/actions/ui.action';
import { AppState } from './state/app.reducer';
import { SidenavService } from './utils/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  public auth!: User | null;
  private authSubs!: Subscription;
  private userSubs!: Subscription;
  mobileQuery!: MediaQueryList;

  private _mobileQueryListener!: () => void;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  get isLogged() {
    return !!this.auth;
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sidenavService: SidenavService,
    private authSerivce: AuthService,
    private store: Store<AppState>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.authSubs = this.authSerivce
      .renew()
      .subscribe(({ user, accessToken }) => {
        this.store.dispatch(setUser({ user, access_token: accessToken }));
        this.store.dispatch(stopLoading());
      });

    this.userSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
    });
  }

  ngAfterViewInit() {
    this.sidenavService.sideNavToggleSubject.subscribe((res) => {
      if (res) {
        this.sidenav?.toggle();
      }
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.authSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }
}
