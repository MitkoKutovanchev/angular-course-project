import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import AuthService from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanLoad {


  constructor(private authService: AuthService,
    private router: Router) { }



  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    const expectedRole = route.data.expectedRole;
    if (!this.authService.isLoggedIn() || this.authService.getLoggedUser().role != expectedRole) {
      this.router.navigateByUrl('courses/list');
      return false;
    }
    return true;
  }
}
