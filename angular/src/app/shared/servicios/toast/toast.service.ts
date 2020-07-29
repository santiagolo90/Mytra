import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private initialOptions = {
    timeOut: 5000,
    closeButton: true,
    progressBar :false,
    progressAnimation:'decreasing',
    positionClass: 'toast-top-full-width',
    preventDuplicates: true,
  }

  private SUCCESS :string = "success";
  private INFO :string = "info";
  private WARNING :string = "warning";
  private ERROR :string = "error";
  private BLACK :string = "black";
  
  constructor(private toastr: ToastrService) { }

  /**
   * 
   * @param titulo Titulo 
   * @param mensaje Mensaj
   * @param tipo  success/error/warning/info/black
   * @param toastOptions Array con opciones
   */
  showToast(titulo:string,mensaje:string,tipo:string,toastOptions?:any) {

    if (!toastOptions) {
      toastOptions = this.initialOptions;
    }

    switch (tipo) {
      case this.SUCCESS:
        this.toastr.success(mensaje,titulo,toastOptions);
        break;
      case this.INFO:
        this.toastr.info(mensaje,titulo,toastOptions);
        break;
      case this.WARNING:
        this.toastr.warning(mensaje,titulo,toastOptions);
        break;
      case this.ERROR:
        this.toastr.error(mensaje,titulo,toastOptions);
        break;
      case this.BLACK:
        this.toastr.show(mensaje,titulo,toastOptions);
        break;
    
      default:
        this.toastr.info(mensaje,titulo,toastOptions);
        break;
    }
  
  }

}
