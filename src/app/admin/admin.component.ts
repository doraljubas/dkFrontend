import {Component, OnInit} from '@angular/core';
import {HttpService} from "../shared/HttpService";
import ColumnOption from "../shared/components/table/models/column-option";
import {FilterType} from "../shared/filter-model/filterType";
import Action from "../shared/components/table/models/action";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit{
    medications:any[]=[]

    filterTypes=[{id:FilterType.LIKE,name:"LIKE"},{id:FilterType.EXACT,name:"EXACT"}]

    colummOptions:ColumnOption[]=[new ColumnOption("nameMedication","Ime lijeka",this.filterTypes,false),
      new ColumnOption("typeMedication","Vrsta lijeka",this.filterTypes,false),
      new ColumnOption("company","Proizvođač lijeka",this.filterTypes,true, "companyName")]

    pageTitle="Lijekovi"

    actions:Action[]=[new Action("Delete",(obj:any)=>this.deleteMedication(obj),true,"<i class=\"fa-solid fa-trash-can\" ></i>"),
      new Action("Edit",(obj:any)=>this.editMedication(obj),true,"<i class=\"fa-solid fa-pen-to-square\"></i>")]

    chosenFilters:any[]=[]


    constructor(private httpService: HttpService) {

    }
    ngOnInit():void{
      this.getMedications()
    }

    filterChanged(filter:any){
      console.log(this.chosenFilters)
      this.chosenFilters.push(filter)
      this.getMedications()
    }
    filterRemoved(filter:any){
      console.log(this.chosenFilters)
      this.chosenFilters.splice(this.chosenFilters.indexOf(filter),1)
      this.getMedications()
    }
    getMedications(){
      this.httpService.post('getMedications',this.chosenFilters).subscribe(
        (response: any) => {
          console.log(response)
          this.medications=response
        })
    }
    deleteMedication = (obj:any) => {
      console.log("delete")
      console.log(obj)
      this.httpService.get('deleteMedication',{medicationId:obj.idMedication}).subscribe(
        (response: any) => {})
    }
    editMedication = (obj:any) => {
      console.log("edit")
      console.log(obj)
    }

}
