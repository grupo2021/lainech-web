import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/utils/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // private user!: User | null;

  // private authSubs!: Subscription;

  get isLogged() {
    // return !!this.user;
    return true;
  }

  constructor(private router: Router, private sidenavService: SidenavService) {}

  ngOnInit() {
    // this.authSubs = this.store.select('auth').subscribe(({ user }) => {
    //   this.user = user;
    // });
  }

  ngOnDestroy() {
    // this.authSubs?.unsubscribe();
  }

  signout() {
    // this.store.dispatch(AuthActions.signout());
    this.router.navigate(['/auth']);
  }

  sidebarToogle() {
    this.sidenavService.toggle();
  }
}
