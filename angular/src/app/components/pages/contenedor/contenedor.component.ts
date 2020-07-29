import { Component, OnInit,ViewChild, OnDestroy, HostBinding, Input } from '@angular/core';
import { OverlayContainer } from "@angular/cdk/overlay";

import { MatSidenav } from '@angular/material/sidenav';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';

import { Subscription} from 'rxjs';
import { Router } from '@angular/router';

import { ContactoComponent } from "../../../components/pages/contacto/contacto.component";
import { ScrollService } from 'src/app/shared/servicios/scroll/scroll.service';



@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.scss']
})
export class ContenedorComponent implements OnInit, OnDestroy {


  public isLoggedIn: Boolean = false;

  @Input() showMenu: Boolean;

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;



  private subsDialog: Subscription;

  menu: any[] = [
    {
      displayName: 'Uno',
      iconName: 'home',
      route: 'slider',
    },
    {
      displayName: 'Dos',
      iconName: 'supervisor_account',
      route: 'text',
    },
    {
      displayName: 'Tres',
      iconName: 'sports_rugby',
      route: 'players',
    },
    {
      displayName: 'Cuatro',
      iconName: 'group_work',
      route: 'partners',
    },
    {
      displayName: 'Modal',
      iconName: 'email',
      route: 'contacto',
    },
    {
      displayName: 'Administración',
      iconName: 'apps',
      children: [
        {
          displayName: 'Mensajes',
          iconName: 'mark_email_unread',
          route: '/admin/mensajes'
        }
      ]
    }
  ];


  @HostBinding('class') componentCSSClass: any;
  private currentTheme: Subscription;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private scrollService: ScrollService,
    private overlayContainer: OverlayContainer) {


  }





  ngOnInit(): void {
    this.currentTheme = this.scrollService.changeTheme$.subscribe((theme: string) => {
      if (theme !== "") {
        this.onSetTheme(theme);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subsDialog) {
      this.subsDialog.unsubscribe();
    }
    if (this.currentTheme) {
      this.currentTheme.unsubscribe();
    }

  }

  /**
   * Metodo para cambiar entre darth-theme / light-theme  
   */
  public onSetTheme(newTheme: string) {
    let oldTheme = localStorage.getItem('theme');
    
    this.overlayContainer.getContainerElement().classList.remove(oldTheme);
    this.overlayContainer.getContainerElement().classList.add(newTheme);

    this.componentCSSClass = newTheme;
    localStorage.setItem('theme', newTheme)
  }


  closeSidenav() {
    if (this.sidenav._animationState == "open") {
      this.sidenav.close();
    }
  }


  navChildTo(path: any) {
    this.closeSidenav();
    this.router.navigate([path]);
  }

  goTo(path: any) {
    this.closeSidenav();
    if (path == "contacto") {
      this.openModal(path);
    } else {
      this.scrollToSection(path)
    }
  }

  openModal(tipo: string) {
    const isDesktopDevice = this.deviceService.isDesktop();
    let tipoModal: any
    let dialogRef: any;

    if (tipo == 'contacto') {
      tipoModal = ContactoComponent;
    }

    if (isDesktopDevice) {
      dialogRef = this.matDialog.open(tipoModal,
        {
          panelClass: 'dialogContact',
          data: {
            dialog: true
          },
        },

      );
    } else {
      dialogRef = this.matDialog.open(tipoModal, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        panelClass: 'dialogContact',
        data: {
          dialog: true
        },

      });
    }
    this.subsDialog = dialogRef.afterClosed().subscribe(res => {
      console.log("res: ", res);

      if (res && res.result == true) {
      }
    });
  }

  scrollToSection(ruta: any) {
    this.scrollService.scrollTo$.emit(ruta);
  }



}
