import { FilterType } from "./filterType";

export class Filter{
    filterType: FilterType;
    columnName: string;
    value: any;
    values?: any[];
    from: any;
    to: any;

    constructor(filterType: FilterType, columnName: string, value?: any, values?: any[],from?: any, to?: any){
        this.filterType = filterType;
        this.columnName = columnName;
        this.value = value;
        this.values = values;
        this.from = from;
        this.to = to;
    }
}