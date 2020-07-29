import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient} from '@angular/common/http';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

//altas
import { AddTextComponent } from './create/add-text/add-text.component';

//grillas
import { MensajesGrillaComponent } from './grillas/mensajes-grilla/mensajes-grilla.component';

//Componets
import { SearchComponent } from '../../shared/components/search/search.component';

//modulos
import { PrimeNgModule } from "../../shared/modulos/primeng-module/primeng.module";
import { MaterialModule } from "../../shared/modulos/material-module/material.module";
import { HomeModule } from "../pages/home/home.module";
import { SharedModule } from "../../shared/modulos/shared/shared.module";

//libs
import { AngularEditorModule } from '@kolkov/angular-editor';




@NgModule({
  declarations: [
    AddTextComponent,
    AdminComponent,
    SearchComponent,
    MensajesGrillaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimeNgModule,
    MaterialModule,
    HomeModule,
    AngularEditorModule,
    SharedModule

  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
