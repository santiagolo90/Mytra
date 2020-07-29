import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss']
})
export class SeparatorComponent implements OnInit {

  @Input() texto : string = "sin texto";

  constructor() { }

  ngOnInit(): void {
  }

}
