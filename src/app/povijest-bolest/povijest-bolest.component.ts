import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../shared/HttpService";
import UIkit from 'uikit';

@Component({
  selector: 'app-povijest-bolest',
  templateUrl: './povijest-bolest.component.html'
})
export class PovijestBolestComponent implements OnInit {
  id:any
  reportsAndPrescriptions:any[]=[]

  //za spremanje novog nalaza
  report:any={}
  prescriptions:any[]=[]
  patient:any
  doctor:any
  todayDate:any = new Date().toISOString().slice(0, 10);
  medications:any[]=[]

  showReportDetails:boolean=false

  constructor(private route: ActivatedRoute, private httpService:HttpService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.httpService.get('getReports',{patientId:this.id}).subscribe(
      (response: any) => {
        console.log(response)
        this.reportsAndPrescriptions=response
      })
    this.httpService.get('getPatient',{patientId:this.id}).subscribe(
      (response: any) => {
        this.patient=response
      })
    this.httpService.get('getDoctor',{doctorId:5}).subscribe(
      (response: any) => {
        this.doctor=response
      })


  }


  addPrescription():void{
    this.httpService.post('getMedications',[]).subscribe(
      (response: any) => {
        this.medications=response
        this.prescriptions.push({medication:{}})
      })
  }

  saveReportAndPrescriptions():void{
    this.report.dateReport=this.todayDate
    this.report.doctor=this.doctor
    this.report.patient=this.patient
    let dto={report:this.report,prescriptions:this.prescriptions}
    console.log(dto)
    this.httpService.post('addReport',dto).subscribe(
      (response: any) => {
        window.location.reload()
      })
  }

  deleteReport(idReport:any){
    UIkit.modal.confirm("Jeste li sigurni da želite obrisati odabrani nalaz?").then(
      ()=>this.httpService.get('deleteReport',{reportId:idReport}).subscribe(
        (response: any) => {
          window.location.reload()
        }),
      ()=>console.log("cancel"));
  }


}
