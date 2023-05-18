import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../shared/HttpService";

@Component({
  selector: 'app-povijest-bolest',
  templateUrl: './povijest-bolest.component.html'
})
export class PovijestBolestComponent implements OnInit {
  id:any
  public reports:any[]=[]
  public patient:any
  public doctor:any
  public todayDate:any = new Date().toISOString().slice(0, 10);

  public report:any

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

  dodajNalaz():void{
    this.report.dateReport=this.todayDate
    this.report.doctor=this.doctor
    this.report.patient=this.patient
    this.httpService.post('addReport',this.report).subscribe(
      (response: any) => {

      })

  }
}
