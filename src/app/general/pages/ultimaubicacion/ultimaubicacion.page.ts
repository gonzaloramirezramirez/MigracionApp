import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CoordInfo, Marker, UltimaPosicion, UltimaPosicionRQ } from 'src/app/shared/interfaces/sigo.interface';
import { MapControllerService } from 'src/app/shared/services/map-controller.service';
import { GeneralServiceService } from '../../services/general-service.service';

declare var google;

@Component({
  selector: 'sigo-ultimaubicacion',
  templateUrl: './ultimaubicacion.page.html',
  styleUrls: ['./ultimaubicacion.page.scss'],
})
export class UltimaubicacionPage implements OnInit {

  ultUbicacion: any;
  idVehiculo: any;

  map = null;
  marker: any;
  coordInfo: CoordInfo = null;

  constructor(
    private generalService: GeneralServiceService,
    private mapController: MapControllerService,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute
  ) { }
    

  ngOnInit() {
    this.idVehiculo = this.activatedRoute.snapshot.params.IdVehiculo;
    this.obtenerUltimaUbicacion(this.idVehiculo);
  }

  async obtenerUltimaUbicacion(idVehiculo){
    const loading = await this.loadingController.create();
    await loading.present();

    //Obtener ultima unicacion
    const ultpos = await this.ObtenerUbicacion(idVehiculo);

    if (ultpos) {
        this.ultUbicacion = ultpos;
        //Agregar imagen segun tipo de vehiculo
        this.ultUbicacion.Imagen = this.getImagenVehiculo(this.ultUbicacion.IdTipoVehiculo);

        const mymarker: Marker = {
          position:{
            lat: parseFloat(this.ultUbicacion.PosY),
            lng: parseFloat(this.ultUbicacion.PosX)
          },
          title: this.ultUbicacion.Vehiculo,
          icono: this.ultUbicacion.Imagen,
          ruta: this.ultUbicacion.RutaNombre,
          despacho: this.ultUbicacion.IdDespacho
        } 

        await this.loadMap(parseFloat(this.ultUbicacion.PosX),parseFloat(this.ultUbicacion.PosY),mymarker);
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

  async ObtenerUbicacion(idVehiculo): Promise<UltimaPosicion[]> {

    const data: UltimaPosicionRQ = {
      IdVehiculo: idVehiculo
    };

    try{
      const response = await  this.generalService.ObtenerUltimaPosicion(data);
          
      if (response.Codigo == -1) {
          console.error(response.Mensaje);
          return [];
      }

      return response.ultPos;
    }
    catch{

    }        
  }

  actualizarPosicion(){
    this.obtenerUltimaUbicacion(this.idVehiculo);
  }

  getImagenVehiculo(tipoVehiculo) {
    var url = '/assets/img/GPS-iconsCircle/E/' + tipoVehiculo + '.png';
    return  url;
  }

  loadMap(posx,posy,mymarker) {

    this.marker = mymarker;

    // create LatLng object
    const myLatLng = {lat: posy, lng: posx};

    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.addMarker(this.marker);
      mapEle.classList.add('show-map');
    });
  }

  addMarker(marker: Marker) {
    const settingicono = {
      url: marker.icono, // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    var mapMarker = new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
      icon: settingicono
    });

    this.addInfoToMarker(marker, mapMarker);

    return mapMarker;
  }

  addInfoToMarker(marker: Marker, mapMarker: any) {
    this.mapController.getHttpData(marker).subscribe((coodData: any)=>{
      var direccion = coodData.results[0];
      let infoWindowsContent;

      if(direccion){
        this.coordInfo = {
          Ciudad: direccion,
          Vehiculo: marker.title,
          Despacho: marker.despacho,
          Ruta: "Ruta ruta",
          Marcador: marker
        };

        infoWindowsContent = `
                      <div id="content" style="color: black;">
                        <h2 id="firstHeading" class="firstHeading"></h2>
                        <p>Ciudad: ${this.coordInfo.Ciudad}</p>
                        <p>Vehiculo: ${this.coordInfo.Vehiculo}</p>
                        <p>Despacho: ${this.coordInfo.Despacho}</p>
                        <p>Ruta: ${this.coordInfo.Ruta}</p>
                        <p><strong>Ubicacion</strong></p>
                        <p>PosX: ${this.coordInfo.Marcador.position.lng} PosY: ${this.coordInfo.Marcador.position.lat}</p>
                      </div>`
        ;

      }
      else{
        this.coordInfo = {
          Ciudad: "Restriccion Api Key",
          Vehiculo: marker.title,
          Despacho: marker.despacho,
          Ruta: marker.ruta,
          Marcador: marker
        };

        infoWindowsContent = `
                      <div id="content" style="color: black;">
                        <h2 id="firstHeading" class="firstHeading"></h2>
                        <p>Vehiculo: ${this.coordInfo.Vehiculo}</p>
                        <p>Despacho: ${this.coordInfo.Despacho}</p>
                        <p>Ruta: ${this.coordInfo.Ruta}</p>
                        <p><strong>Ubicacion</strong></p>
                        <p>PosX: ${this.coordInfo.Marcador.position.lng} PosY: ${this.coordInfo.Marcador.position.lat}</p>
                      </div>`
        ;
      }

      let infoWindow = new google.maps.InfoWindow({content: infoWindowsContent});

      mapMarker.addListener('click', () => {
        infoWindow.open(this.map, mapMarker);
      });

    });
  }

}
