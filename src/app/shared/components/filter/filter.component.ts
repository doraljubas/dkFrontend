
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
    @Output() public onFilterChange = new EventEmitter<Filter>();
    @Output() public onFilterRemove = new EventEmitter<Filter>();

    currentFilterType=FilterType.NONE;
    allFilterTypes=FilterType;
    currentFilter:any;

    exactFilterValue="";

    checkedList:string[]=[];
    checkedFlags:any={}
    showDropDown=true;

    fromFilterValue=""
    toFilterValue=""

    constructor() {
    }

    ngOnInit(): void {

    }

    onLikeExactFilterChange(){
        if(this.currentFilter)this.onFilterRemove.emit(this.currentFilter);
        if(this.exactFilterValue !=""){
            this.currentFilter=new Filter(this.currentFilterType, this.columnOption.columnId,this.exactFilterValue )
            this.onFilterChange.emit(this.currentFilter)
        }else{
            this.currentFilter=undefined;
        }

    }
    removeFilter(){
        if(this.currentFilter){
            this.onFilterRemove.emit(this.currentFilter)
            this.currentFilter=undefined;
            // if(this.currentFilterType==FilterType.LIKE){
            //     (<HTMLInputElement>document.getElementById(this.columnOption.filterId)).value=''
            // }
            this.exactFilterValue=""
            this.checkedList=[]
            this.fromFilterValue=""
            this.toFilterValue=""
        }
    }

    // onExactFilterChange(value:string){
    //     if(this.currentFilter)this.onFilterRemove.emit(this.currentFilter);
    //     this.currentFilter=new Filter(FilterType.EXACT, this.columnOption.columnId,value )
    //     this.onFilterChange.emit(this.currentFilter)
    // }

    onSelectFilterChange(status:boolean,value:string){
        if(status){
            this.checkedList.push(value);

        }else{
            var index = this.checkedList.indexOf(value);
            this.checkedList.splice(index,1);
        }
        if(this.currentFilter)this.onFilterRemove.emit(this.currentFilter);
        this.currentFilter=new Filter(FilterType.SELECT, this.columnOption.columnId,undefined, this.checkedList )
        console.log(this.currentFilter)
        this.onFilterChange.emit(this.currentFilter)
    }

    onRangeFilterChange(value:string){
        if(this.currentFilter)this.onFilterRemove.emit(this.currentFilter);
        if(this.fromFilterValue!="" && this.toFilterValue!=""){
            this.currentFilter=new Filter(FilterType.RANGE, this.columnOption.columnId,undefined,undefined,this.fromFilterValue,this.toFilterValue )
            this.onFilterChange.emit(this.currentFilter)
        }else{
            this.currentFilter=undefined;
        }
    }

}
