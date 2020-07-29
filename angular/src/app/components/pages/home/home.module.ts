import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';


//Componentes
import { HomeComponent } from './home.component';
import { ContenedorComponent } from "../contenedor/contenedor.component";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { ContactoComponent } from '../contacto/contacto.component';


//Modulos
import { HomeRoutingModule } from './home-routing.module';
import { PrimeNgModule } from "../../../shared/modulos/primeng-module/primeng.module";
import { MaterialModule } from "../../../shared/modulos/material-module/material.module";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from "../../../shared/modulos/shared/shared.module";

//Librerias
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    HomeComponent,
    ContenedorComponent,
    NavbarComponent,
    ContactoComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimeNgModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    HttpClient,
  ],
  exports : [
    NavbarComponent,
    ContenedorComponent

  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
