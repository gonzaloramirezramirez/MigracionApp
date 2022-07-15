import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
//import { LoginMisc } from './misc/logicMisc/loginMisc';

@Injectable({
  providedIn: 'root'
})
export class SigoService {
  private userInfo: any;
  headers: any;
  paramsLoaded = null;

  constructor(private http: HttpClient) { }

  setDataHeaders(headers = {}) {
}
}
