import { Component , OnInit} from '@angular/core';
import {HttpService} from "../shared/HttpService";

@Component({
  selector: 'app-pregled-pacijenata',
  templateUrl: './pregled-pacijenata.component.html'
})
export class PregledPacijenataComponent implements OnInit{
  public patients:any[]=[]

  constructor(private httpService: HttpService) {
  }

  ngOnInit():void{
      this.httpService.post('getPatients',5).subscribe(
        (response: any) => {
          console.log(response)
          this.patients=response
        })
  }
}
