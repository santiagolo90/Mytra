import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpinnerService } from "../../servicios/spinner/spinner.service";



@Injectable({
  providedIn: 'root'
})
export class LoadingGuard implements CanActivate {

  constructor(private router: Router,
    private spinnerService: SpinnerService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let spinner = JSON.parse(sessionStorage.getItem('spinner'));
    if (sessionStorage.getItem('token') == null) {
      this.spinnerService.mostrarSpinner();
    }else{
      if (spinner.slider == false && spinner.text == false) {
        this.spinnerService.mostrarSpinner();
      }
  
      if (spinner.slider == true || spinner.text == true) {
        this.spinnerService.cerrarSpiner();
      }
    }


    return true;
  }

}
