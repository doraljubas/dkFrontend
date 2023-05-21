import {Component, OnInit} from '@angular/core';
import {HttpService} from "../shared/HttpService";
import ColumnOption from "../shared/components/table/models/column-option";
import {FilterType} from "../shared/filter-model/filterType";
import Action from "../shared/components/table/models/action";
import UIkit from 'uikit';

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

    actions:Action[]=[new Action("Delete",(obj:any)=>this.showDeleteModalFunction(obj),true,"<i class=\"fa-solid fa-trash-can\" ></i>"),
      new Action("Edit",(obj:any)=>this.showEditModalFunction(obj),true,"<i class=\"fa-solid fa-pen-to-square\"></i>")]

    chosenFilters:any[]=[]

    showEditModal:boolean=false
    objToBeEdited:any
    showAddPanel:boolean=false
    objToBeAdded:any={company:{}}

    companies:any[]=[]

    editFailed:boolean=false
    failMessage:string=""
    addFailed:boolean=false

    constructor(private httpService: HttpService) { }

    ngOnInit():void{
      this.getMedications()
    }

    filterChanged(filter:any){
      this.chosenFilters.splice(this.chosenFilters.indexOf(filter.oldFilter),1)
      this.chosenFilters.push(filter.newFilter)
      this.getMedications()
    }
    filterRemoved(filter:any){
      this.chosenFilters.splice(this.chosenFilters.indexOf(filter),1)
      this.getMedications()
    }
    filterAdded(filter:any){
      this.chosenFilters.push(filter)
      this.getMedications()
    }


    getMedications(){
      this.httpService.post('getMedications',this.chosenFilters).subscribe(
        (response: any) => {
          this.medications=response
        })
    }

    showDeleteModalFunction(obj:any){
      UIkit.modal.confirm("Jeste li sigurni da želite obrisati odabrani lijek?").then(
        ()=>this.deleteMedication(obj),
        ()=>console.log("cancel"));
    }

    deleteMedication (obj:any) {
      this.httpService.get('deleteMedication',{medicationId:obj.idMedication}).subscribe(
        (response: any) => {window.location.reload()})
    }
    showEditModalFunction(obj:any){
      this.showEditModal=true
      this.httpService.get('getCompanies').subscribe(response=>{
        this.companies=response
        UIkit.modal("#edit").show()
      })
      this.objToBeEdited=obj


    }
    editMedication() {
      console.log(this.objToBeEdited)
      this.httpService.post('editMedication',this.objToBeEdited).subscribe(
        (response: any) => {
          if(response!=0){
            this.editFailed=true
            if(response==1){
              this.failMessage="Ne mogu postojati 2 lijeka istog imena, a različitog tipa"
            }else if(response==2){
              this.failMessage="Već postoji lijek istog imena, tipa i proizvođača"
            }
            return
          }
          window.location.reload()
        })
    }
    showAddPanelFunction(){
      this.httpService.get('getCompanies').subscribe(response=>{
        this.companies=response
        this.showAddPanel=true
      })

    }

    addMedication(){
      this.httpService.post('insertMedication',this.objToBeAdded).subscribe(
        (response: any) => {
          if(response!=0){
            this.addFailed=true
            if(response==1){
              this.failMessage="Ne mogu postojati 2 lijeka istog imena, a različitog tipa"
            }else if(response==2){
              this.failMessage="Već postoji lijek istog imena, tipa i proizvođača"
            }
            return
          }
          window.location.reload()
        })
    }
}
