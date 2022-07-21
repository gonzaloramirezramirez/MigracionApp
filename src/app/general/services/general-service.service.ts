import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstSIGO, LoginConfig, ServiceEndPoints, SystemConfig } from 'src/app/shared/const/sigo.const';
import { environment } from 'src/environments/environment';
import {map, switchMap, tap, timeout} from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Storage as IonicStorage } from '@ionic/storage';
import { DespachoActivoRQ, DespachoActivoRS, EjecutarFuncionSigoRQ, EjecutarFuncionSigoRS, Persona, PersonaOperativa, PersonaOperativaRQ, PersonaOperativaRS, RecorridoRQ, RecorridoRS, UltimaPosicionRQ, UltimaPosicionRS } from 'src/app/shared/interfaces/sigo.interface';
import { SqliteHelperService } from './sqlite-helper.service';
const TOKEN_KEY = 'my-token';


@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  private userInfo: any;
  headers: any;

  constructor(private http: HttpClient,
              private localStorage: IonicStorage,
              ) { 
    this.init();
    this.loadToken();
    
  }
  async loadToken() {
    const token =  await this.localStorage.get(TOKEN_KEY);  

    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
    
    this.isAuthenticated.next(true);
  }

  login(credentials: {user, password, empr}) {

    const headers = new HttpHeaders(
      {
          'Content-Type'  : 'application/json',
          'sist_sist'     : <string>environment.sist_sist.toString(),
          'empr_empr'     :  credentials.empr.toString(),
          'app_adm'       : environment.app_adm
      }
    );

    const data =  {'UserName': credentials.user, 'Password': credentials.password};

    const res = this.http.post(environment.baseurl + ServiceEndPoints.login, data , { headers: headers})
        .pipe(
          tap(_ => {
          this.isAuthenticated.next(true);
        }),
        timeout(LoginConfig.loginTimeOut));
        
    return  res;
    
  }

  public getEmpresas (credentials: {user}): Observable<any>  {
    this.localStorage.remove('empresasUser');

    const headers = new HttpHeaders({
      'Content-Type'  : 'application/json',
      'app_adm'       : environment.app_adm
    });
    
    const data = {Usuario: credentials.user, CodSistema: environment.sist_sist.toString()};
    const res =  this.http.post(environment.baseurl + ServiceEndPoints.EmpresasUsuarioRQ, data , { headers: headers})
        .pipe(timeout(LoginConfig.loginTimeOut));
    return  res;
  }

  public getDespachos (credentials: {user}): Observable<any>  {
    this.localStorage.remove('empresasUser');

    const headers = new HttpHeaders({
      'Content-Type'  : 'application/json',
      'app_adm'       : environment.app_adm
    });
    
    const data = {Usuario: credentials.user, CodSistema: environment.sist_sist.toString()};
    const res =  this.http.post(environment.baseurl + ServiceEndPoints.EmpresasUsuarioRQ, data , { headers: headers})
        .pipe(timeout(LoginConfig.loginTimeOut));
    return  res;
  }

  public EjecutarFuncionSigo(data: EjecutarFuncionSigoRQ): Observable<EjecutarFuncionSigoRS> {
    this.setDataHeaders();
    return this.http.post(environment.baseurl + ConstSIGO.services.EjecutarFuncionSigoRQ,
        data, { headers: this.headers })
        .pipe(
            map((response: EjecutarFuncionSigoRS) => response),
        );
  }

  /**
   * 
   * @param data Permite obtener los despachos activos
   * @returns 
   */
  public ObtenerDespachos(data: DespachoActivoRQ): Promise<DespachoActivoRS> {
    this.setDataHeaders();
    return this.http.post(environment.baseurl
        + ConstSIGO.services.DespachosRQ,
        data, { headers: this.headers })
        .pipe(
            map((response: DespachoActivoRS) => response),
            timeout(SystemConfig.timeOut)
        )
        .toPromise<DespachoActivoRS>();
  }

  setDataHeaders(headers = {}) {
    //this.userInfo = await this.getCurrentUser();
    if (environment.activeJWT) {
        this.headers = {
            ...{
                'Content-Type': 'application/json',
                // 'sist_sist': environment.sist_sist.toString(),
                // 'empr_empr': this.userInfo.CompanyCode.toString(),
                // 'app_adm': environment.app_adm,
                'Authorization': 'Bearer ' + this.userInfo.BearerToken.toString()
            },
            ...headers
        };
    } else {
        this.headers = {
            ...{
                'Content-Type': 'application/json',
                'sist_sist': environment.sist_sist.toString(),
                'empr_empr': this.userInfo.CompanyCode.toString(),
                'app_adm': environment.app_adm,
                'Authorization': 'Basic ' + this.userInfo.authdata
            },
            ...headers
        };
    }

    this.headers = new HttpHeaders(this.headers);
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return this.localStorage.remove(TOKEN_KEY);
  }
  
  async init() {
    this.localStorage = await this.localStorage.create();
    try{
      var curuser = await this.getCurrentUser();
      if(curuser && curuser.BearerToken){
        this.userInfo = curuser;
      }
    }
    catch{

    }
  }
 
  //#region localstorage

  public setStorage(key: string, value: any) {
    this.localStorage?.set(key, value);
  }

  public setBearerToken(value: any) {
    this.localStorage?.set(TOKEN_KEY, value);
  }

  public setCurrentUser(value: any) {
    this.localStorage.remove('currentUser');
    this.localStorage?.set('currentUser', value);
  }

  public getCurrentUser(): any {
      return this.localStorage.get('currentUser');
  }

  public setCurrentEmpr(value: any) {
    this.localStorage?.set('currentEmpr', value);
  }

  public getCurrentEmpr(): any {
    return this.localStorage.get('currentEmpr');
  }

  public setEmpresasUser (empresas: any[]): void {
    this.localStorage.remove('empresasUser');
    this.localStorage.set('empresasUser', empresas);
  }

  public getSession(key: string): any {
    return this.localStorage.get(key);
  }

  public getEmpresasUser (): any[] {
    return this.getSession('empresasUser');
  }

  public getEmresaIdProd (): any {
      const crr = this.getCurrentUser();
      return crr.IDEmpresaProd || crr.CompanyCode;
  }

  //#endregion

  public SetCredentials(userinfo, credentials: {user, password, empr},listEmpsUser) {
    let empresaSeleccionada = '';
    const authdata = btoa(credentials.user + ':' + credentials.password);
    const empresa = credentials.empr || environment.empresa;
    //const NomEmpresa = LoginMisc.getNomEmpresaProd(logindata) || environment.empresa;

    this.localStorage.set(TOKEN_KEY, userinfo.BearerToken);

    for (let i = 0; i<listEmpsUser.length; i++) {
      var currentEmpre = listEmpsUser[i].CodEmpresa;
      if (currentEmpre == credentials.empr) {
        empresaSeleccionada = listEmpsUser[i].NombreEmpresa;
      }
    }

    const currentUser = {
      authdata    : authdata,
      UserAuthName: userinfo.UserName,//
      //CreatedAt : userinfo.CreatedAt,
      BearerToken : userinfo.BearerToken,
      RefreshToken: userinfo.RefreshToken,//
      DisplayName : userinfo.DisplayName,//
      Email       : '',//userinfo.Email,
      IDUsuario   : userinfo.UserId,//
      Id          : userinfo.SessionId,//
      //LastModified: userinfo.LastModified,
      //UserAuthId  : userinfo.UserAuthId,
      IDEmpresaProd: empresa,
      CompanyCode :  empresa,
      CompanyName : empresaSeleccionada
    };
    // environment.nombreSistema = logindata.empresaname;
    //GlobalMisc.setSysname(currentUser.CompanyName);

    this.userInfo = currentUser;
    this.setCurrentUser(currentUser);
    this.setCurrentEmpr(credentials.empr);

    return (userinfo.IsAuthenticated === true);
  }

  public ObtenerUltimaPosicion(data: UltimaPosicionRQ): Promise<UltimaPosicionRS> {
    this.setDataHeaders();
    return this.http.post(environment.baseurl
        + ConstSIGO.services.UbicacionRQ,
        data, { headers: this.headers })
        .pipe(
            map((response: UltimaPosicionRS) => response),
            timeout(SystemConfig.timeOut)
        )
        .toPromise<UltimaPosicionRS>();
  }

  public ObtenerRecorrido(data: RecorridoRQ): Promise<RecorridoRS> {
    this.setDataHeaders();
    return this.http.post(environment.baseurl
        + ConstSIGO.services.RecorridoRQ,
        data, { headers: this.headers })
        .pipe(
            map((response: RecorridoRS) => response),
            timeout(SystemConfig.timeOut)
        )
        .toPromise<RecorridoRS>();
  }

  public getPosition(fn){
    navigator.geolocation.getCurrentPosition(        

      function (position) {
        return fn(position);
      },
      async function (error) {
          var msj;
          
          if (error.code == 1) {
              msj = "No se logró obtener la posición.\nVerifique que el GPS esté habilitado e intente realizar la inspección nuevamente.";
          }
          else
              if (error.code == 2) {
                  msj = "No se logró obtener la posición.\nVerifique que el GPS esté habilitado e intente realizar la inspección nuevamente.";
              }
              else
                  if (error.code == 3) {
                      msj = "No se logró obtener la posición.\nVerifique que el GPS esté habilitado e intente realizar la inspección nuevamente.";
                  }

          const alert = await this.alertController.create({
            header: 'Falla en la ubicación.',
            message: msj,//res.error,
            buttons: ['OK'],
          });
          await alert.present();

          return fn("");
      },
      {
          timeout: 30000,
          enableHighAccuracy: false,
          maximumAge: 75000
      });
  }

  public ObtenerDatosInspeccion(data: PersonaOperativaRQ): Promise<PersonaOperativaRS> {
    this.setDataHeaders();
    return this.http.post(environment.baseurl
        + ConstSIGO.services.DatosInspeccionRQ,
        data, { headers: this.headers })
        .pipe(
            map((response: PersonaOperativaRS) => response),
            timeout(SystemConfig.timeOut)
        )
        .toPromise<PersonaOperativaRS>();
  }

  //Formatear fecha
  formatDate(date: any) {

      var dd = date.getDate();
      var mm = date.getMonth() + 1;

      var yyyy = date.getFullYear();
      if (dd < 10) {
          dd = '0' + dd;
      }
      if (mm < 10) {
          mm = '0' + mm;
      }
      return dd + '/' + mm + '/' + yyyy;
  }

}
