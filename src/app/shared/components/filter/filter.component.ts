
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

import ColumnOption from "../table/models/column-option";
import {Filter} from "../../filter-model/filter";
import {FilterType} from "../../filter-model/filterType";

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: []
  })
  export class FilterComponent implements OnInit{

    @Input() public columnOption!: ColumnOption;
    @Output() public onFilterChange = new EventEmitter<any>();
    @Output() public onFilterRemove = new EventEmitter<Filter>();
    @Output() public onFilterAdd = new EventEmitter<Filter>();

    currentFilterType=FilterType.NONE;
    allFilterTypes=FilterType;
    currentFilter:any;

    filterValue="";

    constructor() {
    }

    ngOnInit(): void {

    }

    onLikeExactFilterChange(){
        if(this.filterValue !=""){
          let newFilter=new Filter(this.currentFilterType, this.columnOption.columnId,this.filterValue )
          if(this.currentFilter){
            this.onFilterChange.emit({oldFilter:this.currentFilter,newFilter:newFilter})
          }else{
            this.onFilterAdd.emit(newFilter)
          }
          this.currentFilter=newFilter;
        }else{
            this.onFilterRemove.emit(this.currentFilter);
            this.currentFilter=undefined;
        }

    }
    removeFilter(){
        if(this.currentFilter){
            this.onFilterRemove.emit(this.currentFilter)
            this.currentFilter=undefined;
        }
    }

}
