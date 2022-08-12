import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DBService } from '../../services/db.service';
import { SincronizarService } from '../../services/sincronizar.service';

@Component({
  selector: 'sigo-menunovedadessupervisor',
  templateUrl: './menunovedadessupervisor.page.html',
  styleUrls: ['./menunovedadessupervisor.page.scss'],
})
export class MenunovedadessupervisorPage implements OnInit {

  NroReg: any;
  Sincronizar: boolean = false;

  constructor(
    private sincronizarService: SincronizarService,
    private db: DBService, 
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
    ) 
    { }

  ngOnInit() {
    this.getPendientes();
  }

  async getData(){
    const loading = await this.loadingController.create();
    await loading.present();

    await this.sincronizarService.DescargarDatos();

    await loading.dismiss();
  }

  async goSincronizar(){
    //Enviar inspecciones pendientes de sincronizar
    const loading = await this.loadingController.create();
    await loading.present();

    if(this.NroReg == 0){
      await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Sin Inspecciones',
          message: 'No hay inspecciones pendientes de sincronización.',//res.error,
          buttons: ['OK'],
        });
        await alert.present();
    }
    else{
      //Sincronizar

      await loading.dismiss();
    }
  }

  goDespachoRecoleccion(){
    this.router.navigate(['/empresas']);
  }

  goActualizarDocumento(){
    
    this.router.navigate(['/empresas']);
  }

  goPesosxSincronizar(){
    this.router.navigate(['/empresas']);
  }

  //Obtiene registros pendientes para sincronizar
  async getPendientes(){

    const loading = await this.loadingController.create();
    await loading.present();

    this.NroReg = await this.db.getPendientes();

    if (this.NroReg > 0) {
      this.Sincronizar = true;                                
    }
    else
    {
      this.Sincronizar = true; //false
    }

    await loading.dismiss();
  }

}
