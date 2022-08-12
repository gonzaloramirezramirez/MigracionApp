import { Component, OnInit } from '@angular/core';
import { Tablas } from '../../models/enums';
import { DBService } from '../../services/db.service';
import { GeneralServiceService } from '../../services/general-service.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'sigo-inspeccionrecoleccion',
  templateUrl: './inspeccionrecoleccion.page.html',
  styleUrls: ['./inspeccionrecoleccion.page.scss'],
})
export class InspeccionrecoleccionPage implements OnInit {

  public dsCriteriosInspeccion : any[] = [];
  constructor(private dbservice: DBService, private generalService: GeneralServiceService, private camera: Camera) { }

  async ngOnInit() {
    await this.getInspeccionSupervisor();
  }

  async getInspeccionSupervisor(){
    const usuario = (await this.generalService.getCurrentUser())?.DisplayName;
    const empresa = await this.generalService.getCurrentEmpr();

    const inspecciones = await this.dbservice.fetch(null, Tablas.CriteriosPorServicio, usuario, empresa);
    this.setAccordion(inspecciones);
  }

  setAccordion(datos){
    let tempCriterios = [];
    var sistema = -5;

    if (datos.length > 0) {
        for (let i = 0; i < datos.length; i++) {
            if (sistema != datos[i].NombreCriterio) {
                if (tempCriterios.length > 0) {
                  this.dsCriteriosInspeccion.push({ Sistema: sistema, Criterios: tempCriterios });
                  tempCriterios = [];
                }
                sistema = datos[i].NombreCriterio;
            }

            if(datos[i].TipoRespuesta == "BM"){
                tempCriterios.push({ "IdCriterio": datos[i].IdCriterio, "Criterio": datos[i].NombreCriterio, "Valor": "B", "Descripcion": datos[i].CritInspeccionar, "calificacionItem": [{ text: "Bueno", value: "B" }, { text: "Malo", value: "M" }] });
            }
            else{
                tempCriterios.push({ "IdCriterio": datos[i].IdCriterio, "Criterio": datos[i].NombreCriterio, "Valor": "C", "Descripcion": datos[i].CritInspeccionar, "calificacionItem": [{ text: "Cumple", value: "C" }, { text: "No Cumple", value: "N" }] });
            }
        }

        if (tempCriterios.length > 0) {
          this.dsCriteriosInspeccion.push({ Sistema: sistema, Criterios: tempCriterios });
          tempCriterios = [];
        }
    }
  }

  abrirCamara(e){
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

}
