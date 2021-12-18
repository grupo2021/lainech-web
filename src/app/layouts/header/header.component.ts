import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { unsetUser } from 'src/app/state/actions/auth.action';
import { AppState } from 'src/app/state/app.reducer';
import { SidenavService } from 'src/app/utils/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user!: User | null;

  private authSubs!: Subscription;

  get isLogged() {
    return !!this.user;
  }

  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.authSubs?.unsubscribe();
  }

  signout() {
    this.authService.signout().subscribe(() => {
      this.store.dispatch(unsetUser());
      this.router.navigate(['/auth']);
    });
  }

  sidebarToogle() {
    this.sidenavService.toggle();
  }
}
