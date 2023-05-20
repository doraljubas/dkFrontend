import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../shared/HttpService";

@Component({
  selector: 'app-povijest-bolest',
  templateUrl: './povijest-bolest.component.html'
})
export class PovijestBolestComponent implements OnInit {
  id:any
  reports:any[]=[]
  patient:any
  doctor:any
  todayDate:any = new Date().toISOString().slice(0, 10);
  medications:any[]=[]

  report:any={}
  prescriptions:any[]=[]

  constructor(private route: ActivatedRoute, private httpService:HttpService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.httpService.get('getReports',{patientId:this.id}).subscribe(
      (response: any) => {
        console.log(response)
        this.reports=response
      })
    this.httpService.get('getPatient',{patientId:this.id}).subscribe(
      (response: any) => {
        console.log(response)
        this.patient=response
      })
    this.httpService.get('getDoctor',{doctorId:5}).subscribe(
      (response: any) => {
        console.log(response)
        this.doctor=response
        console.log(this.doctor.facility)
      })


  }


  addPrescription():void{
    this.httpService.post('getMedications',[]).subscribe(
      (response: any) => {
        this.medications=response
        this.prescriptions.push({medication:{}})
      })
  }

  spremiNalaz():void{
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
}
