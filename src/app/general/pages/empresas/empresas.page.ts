import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { GeneralServiceService } from '../../services/general-service.service';

@Component({
  selector: 'sigo-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
})
export class EmpresasPage implements OnInit {
  
  listEmpresas: any;

  constructor(
    private generalService: GeneralServiceService,
    private router: Router,
    private appComponent: AppComponent) { }

  ngOnInit() {
    this.obtenerEmpresas();
  }

  async obtenerEmpresas(){
    this.listEmpresas = await this.generalService.getEmpresasUser();
    if(this.listEmpresas.length > 0){
      //Mostrar opcion
    }else{
      //Ocultar opcion
    }
  }

  //Almacenar empresa seleccionada y navedar a home
  goTo(event){
    this.generalService.setCurrentEmpr(event.CodEmpresa);
    this.appComponent.setEmpresaActual(event.NombreEmpresa);
    this.router.navigate(['/home']);
  }
}
