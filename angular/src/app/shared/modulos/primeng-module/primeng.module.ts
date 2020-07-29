import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CarouselModule } from 'primeng/carousel';
import { FileUploadModule } from 'primeng/fileupload';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { CaptchaModule } from 'primeng/captcha';
import { CardModule } from 'primeng/card';
import { DeferModule } from 'primeng/defer';
import { PaginatorModule } from 'primeng/paginator';






const myPrimeNGModule = [
  MenuModule,
  ToolbarModule,
  ButtonModule,
  SidebarModule,
  CarouselModule,
  FileUploadModule,
  ScrollPanelModule,
  ToastModule,
  ProgressSpinnerModule,
  TableModule,
  CaptchaModule,
  CardModule,
  DeferModule,
  PaginatorModule
  
];

@NgModule({
  declarations: [],
  imports: [CommonModule, myPrimeNGModule],
  exports: [myPrimeNGModule]
})
export class PrimeNgModule { }
