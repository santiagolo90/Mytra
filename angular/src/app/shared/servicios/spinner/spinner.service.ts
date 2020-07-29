import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  dialogRef :any;

  constructor(private matDialog : MatDialog) {}

  mostrarSpinner() {
    this.dialogRef = this.matDialog.open(SpinnerComponent, {
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'spinnerFondo',
      data : {
        tipo : 'login'
      }
    });
  }

  mostrarSpinnerPrincipal() {
    this.dialogRef = this.matDialog.open(SpinnerComponent, {
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'spinnerFondoPrincipal',
      data : {
        tipo : 'principal'
      }
    });
  }

  cerrarSpiner(){
    this.dialogRef = this.matDialog.closeAll();
  }
}
