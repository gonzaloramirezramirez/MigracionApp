import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { RecorridorutaPage } from '../general/pages/recorridoruta/recorridoruta.page';
import { GeneralServiceService } from '../general/services/general-service.service';
import { ConstSIGO } from '../shared/const/sigo.const';
import { DespachoActivoRQ, DespachoActivoRS, DespachoWS, EjecutarFuncionSigoRQ, GrupoDispositivo, SeguimientoGrupo } from '../shared/interfaces/sigo.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  idEmpresaSel: any;
  currUsr: any;
  datosDespacho: DespachoWS[];

  gruposDispositivos: GrupoDispositivo[];
  grupoActual: GrupoDispositivo;

  configAlarmas = {
    ALARMA_PESO: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'Registrar Peso.'
    },
    ALARMA_ACCION: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'Definir Retorno.'
    },
    ALARMA_BASE: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'Finalizar Recorrido.'
    },
    ALARMA_VELOCIDADSINDESPACHO: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'Vehículo en movimiento.'
    },
    ALARMA_MECANICO: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'Registrar llegada mecánico.'
    },
    ALARMA_SALIDABASE: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'Entrada a ruta sin SB.'
    },
    ALARMA_SALIDADISPOSICION: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'Novedad salida de DF.'
    },
    ALARMA_SALIDADISPOSICIONSINENTRADA: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'Salida de DF sin entrada.'
    },
    ALARMA_ENTRADARUTA: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'Novedad entrada a ruta.'
    },
    ALARMA_SALIDARUTA: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'Falta Salida de ruta.'
    },
    ESTADO_VARADO: {
        ruta: '/assets/img/advancedsettings.png',
        titulo: 'Vehículo varado.'
    },
    ESTADO_SALIDAFRECUENCIA: {
        ruta: '/assets/img/timeclock128.png',
        titulo: 'Vehículo fuera de frecuencia.'
    },
    ESTADO_ENTRANSITO: {
        ruta: '/assets/img/autoship.png',
        titulo: 'En transito.'
    },
    ESTADO_NOHABILITAD: {
        ruta: '/assets/img/Red_light_symbol64.png',
        titulo: 'Vehículo en  Pre-Inspección.'
    },
    ESTADO_POSTOPERACIONAL: {
        ruta: '/assets/img/Red_light_symbol64.png',
        titulo: 'Vehículo rechazado en Post Operacional.'
    },
    ESTADO_ZDISPOSIBLE: {
        ruta: '/assets/img/Green_light_symbol64.png',
        titulo: 'Vehículo disponible.'
    },
    ALARMA_ENTRADA_RUTA: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'No se ha reportado la entrada a ruta al SIGAB.'
    },
    ALARMA_SALIDA_RUTA: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'No se ha reportado la salida de ruta al SIGAB.'
    },
    ESTADO_HABILITADO: {
        ruta: '/assets/img/gif/animated-siren.gif',
        titulo: 'Vehículo Habilitado.'
    },
  };

  configTipoVehiculo = {
    1: {
      ruta: '/assets/img/GPS-iconsCircle/E/1.png'
    },
    2: {
        ruta: '/assets/img/GPS-iconsCircle/E/2.png'
    },
  };

  constructor(
    private generalService: GeneralServiceService, 
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private appComponent: AppComponent,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.cargarDespachos();
  }

  async cargarDespachos(){

      const loading = await this.loadingController.create();
      await loading.present();

      //ObtenerUsuario
      this.currUsr = await this.generalService.getCurrentUser();
      this.idEmpresaSel = await this.generalService.getCurrentEmpr();
      await this.cargarDatos(this.currUsr,this.idEmpresaSel);

      //Obtener despachos activos
      const despachos = await this.ObtenerDespachos(this.idEmpresaSel,this.currUsr);

      if (despachos.length) {
          this.datosDespacho = despachos;
          await loading.dismiss();
      }else{
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'No hay datos para mostrar.',
          message: 'Valide permisos de la empresa',//res.error,
          buttons: ['OK'],
        });
        await alert.present();
        this.router.navigate(['/empresas']);
      }

  }

  async ObtenerDespachos(idEmpresa, currUsr): Promise<DespachoWS[]> {

    const data: DespachoActivoRQ = {
        IdEmpresa: idEmpresa,
        Usuario: currUsr.UserAuthName
    };

    try{
      const response = await  this.generalService.ObtenerDespachos(data);
          
      if (response.Codigo == -1) {
          console.error(response.Mensaje);
          return [];
      }

      return response.Despachos;
    }
    catch{

    }        
  }

  async cargarDatos(currUsr,idEmpresa){
    let listEmpsUser = await this.generalService.getEmpresasUser();
    let empresaSeleccionada = '';

    for (let i = 0; i<listEmpsUser.length; i++) {
      var currentEmpre = listEmpsUser[i].CodEmpresa;
      if (currentEmpre == idEmpresa) {
        empresaSeleccionada = listEmpsUser[i].NombreEmpresa;
      }
    }

    //Actualizar variables de sesion
    currUsr.IDEmpresaProd = idEmpresa;
    currUsr.CompanyCode = idEmpresa;
    currUsr.CompanyName = empresaSeleccionada;

    await this.generalService.setCurrentUser(currUsr);

    //Actualizar datos visuales
    this.appComponent.setEmpresaActual(currUsr.CompanyName);
    this.appComponent.setUsuarioActual(currUsr.UserAuthName);
  }

  /**
     * Consulta la información de seguimiento por grupo de dispositivo para la empresa actual
     */
   cargarDatosSeguimiento(IdGrupoDispositivo: number): Promise<SeguimientoGrupo[]> {

    const data: EjecutarFuncionSigoRQ = {
        NombreFuncion: ConstSIGO.idFuncionObtenerControlOperaciones,
        Parametros: {
            IdEmpresa: new Number(this.idEmpresaSel),
            IdGrupoDispositivo
        }
    };

    return this.generalService.EjecutarFuncionSigo(data)
        .pipe(
            map(response => {

                if (response.Codigo == -1) {
                    console.error(response.Mensaje);
                    return [];
                }

                const { DatosConsulta = [] } = response.Respuesta;
                return DatosConsulta.map(item => item as SeguimientoGrupo);
            }),
        )
        .toPromise<SeguimientoGrupo[]>();
  }

  /**
     * Carga los grupos de dispositivos de visualización para la empresa actual
     */
   cargarGruposDispositivos(): Promise<GrupoDispositivo[]> {

    const data: EjecutarFuncionSigoRQ = {
        NombreFuncion: ConstSIGO.idFuncionObtenerGrupoDispositivos,
        Parametros: {
            IdEmpresa: new Number(this.idEmpresaSel),
            TipoUso: ConstSIGO.GrupoDispositivoTipoUsoVisualizacion
        }
    };

    return this.generalService.EjecutarFuncionSigo(data)
        .pipe(
            map(response => {

                if (response.Codigo == -1) {
                    console.error(response.Mensaje);
                    return [];
                }

                const { DatosConsulta = [] } = response.Respuesta;
                return DatosConsulta.map(item => item as GrupoDispositivo);
            }),
        )
        .toPromise<GrupoDispositivo[]>();
  }

  toLocation(item){
    console.log(item);
  }

  presentPopover(item,vel){
    console.log(item);
  }

  customCss(name) {
    if (name) {
      return "style='background-color: bisque;'";
    }
  }

  /**
   * Obtiene el color correspondiente para la columna de última fecha en el grid de seguimiento con base
   * a la diferencia de tiempo entre la fecha actual y la fecha del registro
   */
   getColorSeguimiento(row) {

    var ultimoReporte = new Date(row);  

    let color = '#f61a1a';

    if (ultimoReporte) {
        const now = new Date();

        // Diferencia entre la fecha de ultimo reporte y la fecha actual en minutos
        var dif = (now.getTime() - ultimoReporte.getTime()) / 60000;

        if (dif < 30) {
            color = '#55a708';
        } else if (dif >= 30 && dif < 60) {
            color = '#fbdb1a';
        } else if (dif >= 60 && dif <= 180) {
            color = '#ff8000';
        } else if (dif > 180) {
            color = '#f61a1a';
        }
    }

    return color;
}

getImagenVehiculo(tipoVehiculo) {
  return  '/assets/img/GPS-iconsCircle/E/' + tipoVehiculo + '.png';
}

//Metodo para abrir inspeccion de vehiculo
goInspeccion(item){
    /*this.generalService.getPosition().subscribe((coodData: any)=>{
        var direccion = coodData.results[0];
        let infoWindowsContent;

    });*/

    if(item.TipoServicio == 'Aprovechamiento'){
        this.router.navigate(['/inspeccion']);
    }else{
        this.router.navigate(['/inspeccionrecoleccion']);
    }
}

//Metodo que permite visualizar el recorrido del vehiculo
goRecorrido(item){
    //this.navCtrl.setRoot(RecorridorutaPage,{vehiculo: item.Vehiculo});
    //item.IdDespacho] ,item.NumeroViaje,item.Vehiculo,item.Ruta.item.IdRuta,item.IdTipoVehiculo
    // [routerLink]="['/recorridoruta',item.IdDespacho] ,item.NumeroViaje,item.Vehiculo,item.Ruta,item.IdRuta,item.IdTipoVehiculo
    this.router.navigate(['/recorridoruta',item.IdDespacho,item.NumeroViaje,item.Vehiculo,item.Ruta,item.IdRuta,item.TipoVehiculo]);
}

//Metodo que permite visualizar el recorrido del vehiculo
goNovedades(){
  
}

goMasOpciones(){
  
}

}
