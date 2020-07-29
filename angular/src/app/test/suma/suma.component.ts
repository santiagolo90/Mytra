import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-suma',
  templateUrl: './suma.component.html',
  styleUrls: ['./suma.component.scss']
})
export class SumaComponent implements OnInit {

  @ViewChild('result') result : any;
  @ViewChild('inputText') inputText : any;

  title = "sumar";

  public name:string =''; 

  constructor() { }

  ngOnInit(): void {
  }


  public add(num1: number, num2:number): number {
    return Number(num1) + Number(num2);
  }


  public printAdd(num1 :number, num2:number) :any {
    this.result.nativeElement.value = this.add(num1,num2);
  }

  /**
   * name
   */
  public getName() {
    //this.name = this.inputText.nativeElement.value;
    console.log(this.inputText.nativeElement.value);
    
     this.name = this.inputText.nativeElement.value;
  }

}
