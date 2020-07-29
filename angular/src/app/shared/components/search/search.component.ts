import { Component, OnInit, EventEmitter, Output,Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  @Input() texto : string = "Filtro";

  searchGlobal = new FormControl('');
  @Output('searchGlobal') searchEmitter = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
    this.searchGlobal.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe((value) =>{
      this.searchEmitter.emit(value);  
    })
  }
  
  clear(){
    this.searchGlobal.reset()
  }
}
