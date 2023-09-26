import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkFunc(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkFunc(state.url);
  }

  canLoad(route: Route): Observable<boolean> {
    return this.checkFunc();
  }

  private checkLogin(url?: string): boolean {
    if (this.authService.checkUserStatus()) { return true; }

    this.authService.logout();
    return false;
  }

  public checkFunc(url?: string, funcId?: string): Observable<boolean> {
    var isOK = this.checkLogin(url);
    return of(isOK);
  }
}
