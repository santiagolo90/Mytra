import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';

import { IMensaje } from "../../../../shared/modelos/mensaje.interface";
import { IPaginate } from "../../../../shared/modelos/paginate.model";
import { MensajesService } from "../../../../shared/servicios/mensaje/mensajes.service";
import { PageEvent } from '@angular/material/paginator';
import { AddTextComponent } from '../../create/add-text/add-text.component';

@Component({
  selector: 'app-mensajes-grilla',
  templateUrl: './mensajes-grilla.component.html',
  styleUrls: ['./mensajes-grilla.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MensajesGrillaComponent implements OnInit, OnDestroy {

  public mostrarSpinner: boolean = false;

  public allMsj: Array<IMensaje> = [];


  public panelOpenState: boolean;

  selectedColumns: any[];
  private subsForms: Subscription;

  //Tabla PrimeNG
  cols: any[] = [
    { field: 'nombre', header: 'nombre' },
    { field: 'apellido', header: 'apellido' },
    { field: 'email', header: 'email' },
    { field: 'telefono', header: 'telefono' },
    { field: 'mensaje', header: 'mensaje' },
    { field: 'action', header: 'action' }
  ];


  public FILTO_GLOBAL: string = 'Filtro global';
  public FILTRO_NOMBRE: string = 'Nombre';
  public FILTRO_APELLIDO: string = 'Apellido';
  public FILTRO_EMAIL: string = 'Email';
  public FILTRO_TELEFONO: string = 'Telefono';
  public FILTRO_MENSAJE: string = 'Mensaje';

  public pagination: number = 5;
  public page: number = 1;
  public totalDocs: number;


  loading: boolean;


  @ViewChild('filtroNombre') filtroNombre: any;
  @ViewChild('filtroApellido') filtroApellido: any;
  @ViewChild('filtroEmail') filtroEmail: any;
  @ViewChild('filtroTelefono') filtroTelefono: any;
  @ViewChild('filtroMensaje') filtroMensaje: any;

  filtos = {
    "nombre": "",
    "apellido": "",
    "email": "",
    "telefono": "",
    "mensaje": "",
    "text": ""
  }


  constructor(private mensajesService: MensajesService,
    private matDialog: MatDialog,
    private deviceService: DeviceDetectorService) {

  }
  ngOnDestroy(): void {
    if (this.subsForms) {
      this.subsForms.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.selectedColumns = this.cols;
    this.panelOpenState = true;

    this.getAllMsjs();
  }



  getAllMsjs() {
    this.mostrarSpinner = true;
    this.subsForms = this.mensajesService.getAll(this.pagination, this.page)
      .subscribe(
        msjs => {
          this.allMsj = msjs.docs;
          // this.page = msjs.page;
          this.totalDocs = msjs.totalDocs;
          this.mostrarSpinner = false;
        },
        error => {
          console.log('error al taer los mensajes ', error);
          this.mostrarSpinner = false;
        });
  }

  onPaginate(event: PageEvent) {

    this.pagination = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllMsjsPaginate()
  }

  getAllMsjsPaginate() {
    this.loading = true;
    this.subsForms = this.mensajesService.getAll(this.pagination, this.page)
      .subscribe(
        msjs => {

          this.allMsj = msjs.docs;
          // this.page = msjs.page;
          this.totalDocs = msjs.totalDocs;
          this.loading = false;
        },
        error => {
          console.log('error al taer los mensajes ', error);
          this.loading = false;
        });

  }


  searchWithFilters(e: string, type: string) {
    let filtro = {};

    switch (type) {
      case 'name':
        filtro = { nombre: e };
        break;
      case 'surname':
        filtro = { apellido: e };
        break;
      case 'email':
        filtro = { email: e };
        break;
      case 'phone':
        filtro = { telefono: e };
        break;
      case 'message':
        filtro = { mensaje: e };
        break;

      default:
        break;
    }

    this.findByElement(filtro);
  }

  cleanInputs() {
    if (this.filtroNombre.searchGlobal.value) {
      this.filtroNombre.searchGlobal.reset();
    }
    if (this.filtroApellido.searchGlobal.value) {
      this.filtroApellido.searchGlobal.reset();
    }
  }

  findByElement(datos) {
    this.loading = true;
    this.subsForms = this.mensajesService.globalSeach(datos)
      .subscribe(
        msjs => {
          this.allMsj = msjs.docs;
          this.page = msjs.page;
          this.totalDocs = msjs.totalDocs;
          this.loading = false;
        },
        error => {
          console.log('error al taer los mensajes ', error);
          this.loading = false;
        });
  }



  globalSearch(e: Event) {
    if (!e) {
      return this.getAllMsjsPaginate();
    }
    const filtro = {
      "text": e
    }

    this.loading = true;
    this.subsForms = this.mensajesService.globalSeach(filtro)
      .subscribe(
        msjs => {

          this.allMsj = msjs.docs;
          this.page = msjs.page;
          this.totalDocs = msjs.totalDocs;
          this.loading = false;
        },
        error => {
          console.log('error al taer los mensajes ', error);
          this.loading = false;
        });

  }


  openModal() {

    const isDesktopDevice = this.deviceService.isDesktop();
    let tipoModal: any = AddTextComponent;
    let dialogRef: any;


    if (isDesktopDevice) {
      dialogRef = this.matDialog.open(tipoModal, {
      });
    } else {
      dialogRef = this.matDialog.open(tipoModal, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
      });
    }
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.result == true) {
        this.getAllMsjs();
      }
      
    });

  }

}
