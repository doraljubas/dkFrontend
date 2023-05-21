import { Component , OnInit} from '@angular/core';
import {HttpService} from "../shared/HttpService";
import {FilterType} from "../shared/filter-model/filterType";
import ColumnOption from "../shared/components/table/models/column-option";
import Action from "../shared/components/table/models/action";

@Component({
  selector: 'app-pregled-pacijenata',
  templateUrl: './pregled-pacijenata.component.html'
})
export class PregledPacijenataComponent implements OnInit{
  patients:any[]=[]
  doctor:any

  filterTypes=[{id:FilterType.LIKE,name:"LIKE"},{id:FilterType.EXACT,name:"EXACT"}]

  colummOptions:ColumnOption[]=[new ColumnOption("name","Ime ",this.filterTypes,false),
    new ColumnOption("surname","Prezime",this.filterTypes,false),
    new ColumnOption("mbo","mbo",this.filterTypes,false)]

  title="Popis pacijenata"

  actions:Action[]=[new Action("Delete",(obj:any)=>this.viewPatient(obj),true,"<i class=\"fa-solid fa-file-medical fa-lg\" style=\"color: #1e87f0;\"></i>")]


  chosenFilters:any[]=[]

  constructor(private httpService: HttpService) {
  }

  ngOnInit():void{
    this.getPatients()
    this.httpService.get('getDoctor',{doctorId:5}).subscribe(
      (response: any) => {
        this.doctor=response
      })
  }
  getPatients(){
    this.httpService.post('getPatients',this.chosenFilters,{doctorId:5}).subscribe(
      (response: any) => {
        console.log(response)
        this.patients=response
      })
  }

  viewPatient(obj:any):void{
    window.location.href = '/pregledPacijenata/'+obj.idPatient;
  }


  filterChanged(filter:any){
    this.chosenFilters.splice(this.chosenFilters.indexOf(filter.oldFilter),1)
    this.chosenFilters.push(filter.newFilter)
    this.getPatients()
  }
  filterRemoved(filter:any){
    this.chosenFilters.splice(this.chosenFilters.indexOf(filter),1)
    this.getPatients()
  }
  filterAdded(filter:any){
    this.chosenFilters.push(filter)
    this.getPatients()
  }
}
