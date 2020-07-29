import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  tipoSpinner:string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.tipoSpinner = data.tipo;
  }

  ngOnInit(): void {
  }

}
