import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MessageService } from 'primeng/api';

import { Subscription, Observable, timer } from 'rxjs';
import { Router } from "@angular/router";
import { ScrollService } from "../../servicios/scroll/scroll.service";

import { ContactoComponent } from "../../../components/pages/contacto/contacto.component";




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [
    MessageService
  ],
})
export class NavbarComponent implements OnInit, OnDestroy ,AfterViewInit {


  @Input() sidenav: MatSidenav;
  @Input() isLoggedIn: Boolean;
  @Input() showMenu: Boolean;
  
  
  private subsDialog: Subscription;
  private subScrollTo: Subscription;
  public currentTheme :string = '';


  constructor(private matDialog: MatDialog,
    private messageService: MessageService,
    private deviceService: DeviceDetectorService,
    private router: Router,
    private scrollService:ScrollService) { 

    }


  ngOnInit(): void {
    if (localStorage.getItem('theme') == null) {
      this.currentTheme = 'dark-theme';
    }else{
      let theme :string = localStorage.getItem('theme'); 
      this.currentTheme = theme;
    }
  }



  ngAfterViewInit(): void {
    const tiempo = timer(100);
    tiempo.subscribe((n) =>{
      this.scrollService.changeTheme$.emit(this.currentTheme);
    })
    
  }
  
  ngOnDestroy(): void {
    if (this.subsDialog) {
      this.subsDialog.unsubscribe();
    }
    if (this.subScrollTo) {
      this.subScrollTo.unsubscribe();
    }

    
  }

  public onSetTheme(e:string){
    this.currentTheme = e;
    this.scrollService.changeTheme$.emit(e);
  }

  scrollToSection(ruta:any) {
     this.scrollService.scrollTo$.emit(ruta);
  }

  

  toggleSidenav() {
    this.sidenav.toggle();
  }



  goTo(path: any) {
    this.router.navigate([path]);
  }

  openModal(tipo: string) {
    const isDesktopDevice = this.deviceService.isDesktop();
    let tipoModal: any
    let dialogRef: any;
    let customClass: any = "";

    if (tipo == 'contacto') {
      tipoModal = ContactoComponent;
      customClass = 'dialogContact';
    }

    if (isDesktopDevice) {
      dialogRef = this.matDialog.open(tipoModal, {
        panelClass: customClass,
        data: {
          dialog: true
        },
      });
    } else {
      dialogRef = this.matDialog.open(tipoModal, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        panelClass: customClass,
        data: {
          dialog: true
        }
      });
    }
    this.subsDialog = dialogRef.afterClosed().subscribe(res => {
      console.log("res: ", res);

      if (res && res.result == true) {
        console.log("result: ", res.result);
        this.messageService.add(
          {
            severity: res.severity,
            summary: res.summary,
            detail: res.detail
          });
      }
    });
  }
}
