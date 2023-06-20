import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router: Router) { }

  canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const session = localStorage.getItem('session');
    if (!session) {
      this.router.navigateByUrl('/login');
      return false;
    }
    
    return true;
  }
  
}
