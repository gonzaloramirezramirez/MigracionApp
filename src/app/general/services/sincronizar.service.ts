import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstSIGO, LoginConfig, ServiceEndPoints, SystemConfig } from 'src/app/shared/const/sigo.const';
import { environment } from 'src/environments/environment';
import {map, switchMap, tap, timeout} from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { GeneralServiceService } from './general-service.service';
import { DBService } from './db.service';
import { LlaveTabla, Tablas } from '../models/enums';
const TOKEN_KEY = 'my-token';


@Injectable({
  providedIn: 'root'
})
export class SincronizarService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  headers: any;

  constructor(private http: HttpClient,
              private generalService: GeneralServiceService,
              private dbService: DBService
              ) {  
  }
  
  public async DescargarDatos(){
    try {
      const respuesta: any = await this.ObtenerDatosSincronizacion();

      if(respuesta !== null){

        for(let dato of Object.entries(respuesta)){
          //Validar dato[0]  
          if (this.ValidarEnum(dato[0])) {
            this.InsertarDatos(dato[0], dato[1]);
          }         

        }
      }

    } catch (error) {
      console.log(error);
    }
    
  }

  private ValidarEnum(nombreTabla: string) {
    const keys = Object.keys(Tablas);

    if (keys.includes(nombreTabla as unknown as Tablas)) {
      return true;
    }

    return false;
  }

  private async InsertarDatos(tabla:string, datos:any){
    
    const usuario = (await this.generalService.getCurrentUser())?.DisplayName;
    const empresa = await this.generalService.getCurrentEmpr();
    
    if(datos){
      for(let registro of datos){
        const llave = this.ObtenerLlaveTabla(tabla);
        const nombreTabla = this.ObtenerTabla(tabla);
        this.dbService.insertBD(registro[llave],JSON.stringify(registro), nombreTabla, usuario, empresa, 'S');
      }
    }    
  }

  private ObtenerLlaveTabla(tabla:string){
    return Object.values(LlaveTabla)[Object.keys(LlaveTabla).indexOf(tabla)];
  }

  private ObtenerTabla(tabla:string){
    return Object.values(Tablas)[Object.keys(Tablas).indexOf(tabla)];
  }

  private async ObtenerDatosSincronizacion ()  {
    this.generalService.setDataHeaders();
    const idEmpresa = await this.generalService.getCurrentEmpr();

    const request = {
      IdEmpresa: idEmpresa
    }

    const res =  this.http.post(environment.baseurl + ConstSIGO.services.DescargarDatosRQ, request, { headers: this.generalService.headers })
        .pipe(timeout(LoginConfig.loginTimeOut))
        .toPromise();
    return res;
  }

}
