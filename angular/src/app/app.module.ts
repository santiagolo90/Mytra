import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//MODULOS
import { PrimeNgModule } from "./shared/modulos/primeng-module/primeng.module";
import { MaterialModule } from "./shared/modulos/material-module/material.module";
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from "./shared/modulos/shared/shared.module";
import { ToastrModule } from 'ngx-toastr';

//Componentes
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

//Servicios
import { TokenInterceptorService } from "./shared/servicios/token-interceptor/token-interceptor.service";
import { ErrorInterceptorService } from "./shared/servicios/error-interceptor/error-interceptor.service";
import { SumaComponent } from './test/suma/suma.component';

//UTILS
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getEsPaginatorIntl } from "./shared/utils/paginator-es";



@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    SumaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimeNgModule,
    MaterialModule,
    DeviceDetectorModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxScrollTopModule,
    FlexLayoutModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    { 
      provide: MatPaginatorIntl, 
      useValue: getEsPaginatorIntl() 
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
