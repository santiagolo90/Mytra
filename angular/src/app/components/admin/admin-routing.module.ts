import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { LoggedGuard } from "../../shared/guard/logged/logged.guard";
import { MensajesGrillaComponent } from "./grillas/mensajes-grilla/mensajes-grilla.component";

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent//,canActivate: [LoggedGuard]
  },
  { 
    path: 'mensajes', 
    component: MensajesGrillaComponent// ,canActivate: [LoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
