import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    if (localStorage.getItem('token') !== null &&
      localStorage.getItem('userId') !== null && localStorage.getItem('roles').indexOf('Administrator') !== -1) {
      return of(true);
    }
    else {
      this.router.navigateByUrl('/login');
      return of(false);
    }
  }

}
