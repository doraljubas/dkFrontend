import {Component, OnInit} from '@angular/core';
import {HttpService} from "../shared/HttpService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  selectedRole:any

  constructor(private httpService: HttpService) {
  }

  ngOnInit():void{

  }
  prijava():void{
    if(this.selectedRole=='L'){
      window.location.href = '/pregledPacijenata';
    }else if(this.selectedRole=='A'){
      window.location.href = '/admin';
    }else if(this.selectedRole=='P'){
      window.location.href = '/';
    }
  }
}
