import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  // constructor(private authService: AuthService, private router: Router) {}

  // canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
  //   const allowedRoles = route.data.roles as string[];

  //   return this.authService.renew().pipe(
  //     map(({ user }) => allowedRoles.includes(user.role)),
  //     catchError((e) => of(false)),
  //     tap((success) => {
  //       if (!success) this.router.navigate(['/auth']);
  //     })
  //   );
  // }
}
