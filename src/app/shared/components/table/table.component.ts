import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import Action from './models/action';
import ColumnOption from './models/column-option';
import {Filter} from "../../filter-model/filter";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: []
})
export class TableComponent implements OnInit, OnChanges {

  @Input() public page:any;
  @Input() public title: String = "";
  @Input() public columnOptions!: ColumnOption[];
  @Input() public actions!:Action[];
  @Output() public onFilterChange = new EventEmitter<Filter>()
  @Output() public onFilterRemove = new EventEmitter<Filter>()



  constructor() {
  }
  public filterOn:boolean=false

  ngOnInit(): void {
    console.log(this.page)
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  onFilterChanged(filter:Filter){
    this.filterOn=true
    this.onFilterChange.emit(filter)
  }
  onFilterRemoved(filter:Filter){
    this.onFilterRemove.emit(filter)
  }
}
