import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeparatorComponent } from "../../components/separator/separator.component";




const sharedComponents = [
  SeparatorComponent,
  
];

const sharedModules = [
    
];

@NgModule({
  declarations: [sharedComponents],
  imports: [CommonModule, sharedModules],
  exports: [sharedComponents]
})
export class SharedModule { }
