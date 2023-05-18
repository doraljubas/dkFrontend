export default class ColumnOption{
    columnId: string;
    columnName: string;
    filters:any[];
    isNested:boolean=false;
   nestedColumnId?:any;

    constructor(columnId: string, columnName: string,filters:any[],isNested:boolean,nestedColumnId?:any){
        this.columnId = columnId;
        this.columnName = columnName;
        this.isNested=isNested
        this.nestedColumnId=nestedColumnId
        this.filters=filters
    }
}
