import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AlertComponent } from '../layouts/alert/alert.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const allowedRoles = route.data['roles'] as string[];

    return this.authService.renew().pipe(
      map(({ user }) => allowedRoles.includes(user.role)),
      catchError((e) => of(false)),
      tap((success) => {
        if (!success)
          this.router.navigate(['/auth']).then(() => {
            this.matDialog.open(AlertComponent, {
              data: {
                title: 'Sin autorizacion',
                content:
                  'No cuentas con los credenciales adecuados para este recurso',
              },
            });
          });
      })
    );
  }
}
