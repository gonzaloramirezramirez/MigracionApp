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
