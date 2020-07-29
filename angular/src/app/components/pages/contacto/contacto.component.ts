import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA ,MatDialogConfig} from '@angular/material/dialog';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  estadoBtnEnviar: boolean = false;


  public mostrarSpinner: boolean = false;
  public isDialog :boolean = false;



  constructor(private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data) {
      this.isDialog=this.data.dialog;
    }
  }

  nombreFormControl = new FormControl('', [
    Validators.required,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  apellidoFormControl = new FormControl('', [
    Validators.required,
  ]);

  telefonoFormControl = new FormControl('', [
    Validators.required,
  ]);

  mensajeFormControl = new FormControl('', [
    Validators.required,
  ]);

  captchaFormControl = new FormControl('', [
    Validators.required,
  ]);


  registroFormMessage: FormGroup = this.formBuilder.group({
    nombre: this.nombreFormControl,
    email: this.emailFormControl,
    apellido: this.apellidoFormControl,
    telefono: this.telefonoFormControl,
    mensaje: this.mensajeFormControl,
    captcha: this.captchaFormControl
  });

  enviarMensaje() {

  }


  showExpire() {
    
  }

  showResponse() {

  }


  clearForm() {
    Object.keys(this.registroFormMessage.controls).forEach(key => {
      this.registroFormMessage.controls[key].setErrors({ 'incorrect': true });
    });
    this.registroFormMessage.reset();
  }

  disableForm(disable: boolean) {
    if (disable) {
      this.nombreFormControl.disable();
      this.apellidoFormControl.disable();
      this.emailFormControl.disable();
      this.telefonoFormControl.disable();
      this.mensajeFormControl.disable();
    } else {
      this.nombreFormControl.enable();
      this.apellidoFormControl.enable();
      this.emailFormControl.enable();
      this.telefonoFormControl.enable();
      this.mensajeFormControl.enable();
    }
  }

}
