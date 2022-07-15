import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PersonaOperativa, PersonaOperativaRQ } from 'src/app/shared/interfaces/sigo.interface';
import { GeneralServiceService } from '../../services/general-service.service';

@Component({
  selector: 'sigo-inspeccion',
  templateUrl: './inspeccion.page.html',
  styleUrls: ['./inspeccion.page.scss'],
})
export class InspeccionPage implements OnInit {

  idEmpresaSel: any;
  personas: PersonaOperativa[];

  constructor(private generalService: GeneralServiceService,
              private loadingController: LoadingController,
              private router: Router,
              private alertController: AlertController,
              private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos(){
    this.idEmpresaSel = await this.generalService.getCurrentEmpr();
    const loading = await this.loadingController.create();
    await loading.present();

    //Obtener ultima unicacion
    const personal = await this.ObtenerDatosInspeccion(this.idEmpresaSel);

    if (personal) {
        this.execute(personal);
        await loading.dismiss();
    }else{
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'No hay datos para mostrar.',
        message: 'Valide permisos de la empresa',//res.error,
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/home']);
    }
    
  }

  execute(personal: PersonaOperativa[]){
    const params = [];

    for (let i = 0; i < personal.length; i++) {
      params.push(personal[i]);
    }
    /*
    this.generalService.sync(params).then(() => {
      this.generalService.get().then((data: PersonaOperativa[]) => {
        console.log(data);
        this.personas = data;
      }).catch((e) => console.error(e));
    }).catch((e) => console.error(e));*/

  }

  async ObtenerDatosInspeccion(idEmpresa): Promise<PersonaOperativa[]> {

    const data: PersonaOperativaRQ = {
      IdEmpresa: idEmpresa
    };

    try{
      const response = await  this.generalService.ObtenerDatosInspeccion(data);
          
      if (response.Codigo == -1) {
          console.error(response.Mensaje);
          return [];
      }

      return response.Personal;
    }
    catch{

    }        
  }

}
