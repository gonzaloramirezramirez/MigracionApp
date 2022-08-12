import { Component } from '@angular/core';
import { GeneralServiceService } from './general/services/general-service.service';
import { ConstSIGO } from './shared/const/sigo.const';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  version = ConstSIGO.versionSigo;
  empresa;
  usuario;

  public appPages = [
    { title: 'Empresas', url: '/empresas', icon: 'home' },
    { title: 'Despachos Recolección', url: '/home', icon: 'car' },
    { title: 'Estado Operación', url: '/recorridoxrutaprogramada', icon: 'analytics' },
    { title: 'Cierre de Anomalías', url: '/ltanovedadtiempo', icon: 'alert-circle' },
    { title: 'Crear Autorización', url: '/autorizacion', icon: 'checkmark' },
    { title: 'Supervisor Recolección', url: '/menunovedadessupervisor', icon: 'create' },
    { title: 'Supervisor Barrido', url: '/menusupbarrido', icon: 'brush' },

    { title: 'Cerrar sesión', url: '/cerrar-sesion', icon: 'lock-closed' },
    
  ];
  
  constructor(
    private generalService: GeneralServiceService,

  ) {}

  setEmpresaActual(value){
    this.empresa = value;
  }

  setUsuarioActual(value){
    this.usuario = value;
  }

}
