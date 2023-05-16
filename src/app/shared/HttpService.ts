import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:8080/';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json');


  constructor(private http: HttpClient) {}

  post(url:any,data?: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+url, data, {headers: this.headers});
  }

  get(url:any, params?:any): Observable<any> {
    return this.http.get<any>(this.apiUrl+url, {headers: this.headers, params:params});
  }
}
