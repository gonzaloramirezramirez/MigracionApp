import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CoordInfo, DatosConsultaRecorrido, Marker, RecorridoRQ } from 'src/app/shared/interfaces/sigo.interface';
import { MapControllerService } from 'src/app/shared/services/map-controller.service';
import { GeneralServiceService } from '../../services/general-service.service';

declare var google;

@Component({
  selector: 'sigo-recorridoruta',
  templateUrl: './recorridoruta.page.html',
  styleUrls: ['./recorridoruta.page.scss'],
})
export class RecorridorutaPage implements OnInit {

  idEmpresaSel: any;
  currUsr: any;

  map = null;
  marker: any;
  coordInfo: CoordInfo = null;
  markers: Marker[] = [];

  idDespacho: any;
  numeroViaje: any;
  vehiculo: any;
  ruta: any;
  idRuta: any;
  idTipoVehiculo: any;

  puntos: any[];
  iconoVehiculo: any;
  ultPosX: any;
  ultPosY: any;
  centro: any;

  dtsRecorrido: DatosConsultaRecorrido[];

  constructor(
    private generalService: GeneralServiceService,
    private mapController: MapControllerService,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idDespacho = this.activatedRoute.snapshot.params.IdDespacho;
    this.numeroViaje = this.activatedRoute.snapshot.params.NumeroViaje;
    this.vehiculo = this.activatedRoute.snapshot.params.Vehiculo;
    this.ruta = this.activatedRoute.snapshot.params.Ruta;
    this.idRuta = this.activatedRoute.snapshot.params.IdRuta;
    this.idTipoVehiculo = this.activatedRoute.snapshot.params.TipoVehiculo;

    //Agregar imagen segun tipo de vehiculo
    this.iconoVehiculo = this.getImagenVehiculo(this.idTipoVehiculo);

    this.obtenerDatos(this.idDespacho,this.numeroViaje,this.idRuta);

  }

  async obtenerDatos(idDespacho,numeroViaje,idRuta){
    const loading = await this.loadingController.create();
    await loading.present();

    //ObtenerUsuario
    this.currUsr = await this.generalService.getCurrentUser();
    this.idEmpresaSel = await this.generalService.getCurrentEmpr();

    //Consultar recorrido
    //this.dtsRecorrido = await this.ObtenerRecorrido(idDespacho,numeroViaje,idRuta);

    //Consultar recorrido
    const data = await this.ObtenerRecorrido(idDespacho,numeroViaje,idRuta);
    //const markers: Marker[] = [];

    if (data) {
        //this.dtsRecorrido = data;
        
        for (let reg of data.Recorrido) {
          let id = 0;
          //this.puntos.push(reg);
              
          const markerdir: Marker = {
            position:{
              lat: reg.PosY,
              lng: reg.PosX
            },
            title: this.vehiculo,
            icono: this.ImagenPosicion(reg.Sentido),
            ruta: this.ruta,
            despacho: this.idDespacho
          } 

          this.markers.push(markerdir);

          if(id == 0){
            this.ultPosX(reg.PosX);
            this.ultPosY(reg.PosY);
            this.centro({ lat: reg.PosY, lng: reg.PosX });
            id = id++;
          }
        }

        this.cuadrantes(data.Geocercas);
      
        const markervehiculo: Marker = {
          position:{
            lat: this.ultPosX,
            lng: this.ultPosY
          },
          title: this.vehiculo,
          icono: this.iconoVehiculo,
          ruta: this.ruta,
          despacho: this.idDespacho
        } 

      this.markers.push(markervehiculo);

      await this.loadMap(this.ultPosX,this.ultPosX,this.markers);
      await loading.dismiss();

    }else{
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'No hay datos para mostrar.',
        message: 'No se encontro recorrido',//res.error,
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/home']);
    }

    if (false) {
      ////////////////////////////////////////////////////////////
      /*
      this.dtsRecorrido.forEach(reg => {
        let id = 0;
        reg.Recorrido.forEach(data => {

          this.puntos.push(data);
            
          const markerdir: Marker = {
            position:{
              lat: data.PosY,
              lng: data.PosX
            },
            title: this.vehiculo,
            icono: this.ImagenPosicion(data.Sentido),
            ruta: this.ruta,
            despacho: this.idDespacho
          } 

          this.markers.push(markerdir);

          if(id == 0){
            this.ultPosX(data.PosX);
            this.ultPosY(data.PosY);
            this.centro({ lat: data.PosY, lng: data.PosX });
            id = id++;
          }
        });

        this.cuadrantes(reg.Geocercas);
      });*/
      ///////////////////////////////////////////////////////////
      /*
      this.dtsRecorrido.forEach(data => {
        if(data.Recorrido.length > 0){
          for (var i = 0; i < data.Recorrido.length; i++) {
            this.puntos.push(data.Recorrido[i]);
            
            const markerdir: Marker = {
              position:{
                lat: data.Recorrido[i].PosY,
                lng: data.Recorrido[i].PosX
              },
              title: this.vehiculo,
              icono: this.ImagenPosicion(data.Recorrido[i].Sentido),
              ruta: this.ruta,
              despacho: this.idDespacho
            } 

            this.markers.push(markerdir);
          }
        }

        this.ultPosX(data.Recorrido[0].PosX);
        this.ultPosY(data.Recorrido[0].PosY);
        this.centro({ lat: data.Recorrido[0].PosY, lng: data.Recorrido[0].PosX });
        this.cuadrantes(data.Geocercas);
      });*/


      ///************************************************************************///
      /*
      for (let reg of this.dtsRecorrido) {
        let id = 0;
        for(let data of reg.Recorrido){
          this.puntos.push(data);
            
          const markerdir: Marker = {
            position:{
              lat: data.PosY,
              lng: data.PosX
            },
            title: this.vehiculo,
            icono: this.ImagenPosicion(data.Sentido),
            ruta: this.ruta,
            despacho: this.idDespacho
          } 

          this.markers.push(markerdir);

          if(id == 0){
            this.ultPosX(data.PosX);
            this.ultPosY(data.PosY);
            this.centro({ lat: data.PosY, lng: data.PosX });
            id = id++;
          }
        }
        this.cuadrantes(reg.Geocercas);
      }
      */
      ///************************************************************************///

      const markervehiculo: Marker = {
        position:{
          lat: this.ultPosX,
          lng: this.ultPosY
        },
        title: this.vehiculo,
        icono: this.iconoVehiculo,
        ruta: this.ruta,
        despacho: this.idDespacho
      } 

      this.markers.push(markervehiculo);

      await this.loadMap(this.ultPosX,this.ultPosX,this.markers);
      await loading.dismiss();
    }else{
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'No hay datos para mostrar.',
        message: 'No se encontro recorrido',//res.error,
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/home']);
    }
  }

  async ObtenerRecorrido(idDespacho,numeroViaje,idRuta): Promise<DatosConsultaRecorrido> {

    const data: RecorridoRQ = {
      IdEmpresa: this.idEmpresaSel,
      IdDespacho: idDespacho,
      NumViaje: numeroViaje,
      IdRuta: idRuta
    };

    try{
      const response = await  this.generalService.ObtenerRecorrido(data);
          
      if (response.Codigo == -1) {
          //console.error(response.Mensaje);
          return null;
      }

      return response.dtsConsultaRecorrido;

    }
    catch{

    }        
  }

  getImagenVehiculo(tipoVehiculo) {
    var url = '/assets/img/GPS-iconsCircle/E/' + tipoVehiculo + '.png';
    return  url;
  }

  ImagenPosicion(tipoDireccion){
    var url = "";
    switch (tipoDireccion) {
        case "N":
            url = "/assets/img/images/norte.png";
            break;
        case "NE":
            url = "/assets/img/images/noreste.png";
            break;
        case "NO":
            url = "/assets/img/images/noroeste.png";
            break;
        case "S":
            url = "/assets/img/images/sur.png";
            break;
        case "SE":
            url = "/assets/img/images/sureste.png";
            break;
        case "SO":
            url = "/assets/img/images/suroeste.png";
            break;
        case "E":
            url = "/assets/img/images/este.png";
            break;
        case "O":
            url = "/assets/img/images/oeste.png";
            break;        
        default:
            url = "/assets/img/images/none.png";
            break;
    }
    return url;
  }
  
  cuadrantes(geocercas){

  }

  loadMap(posx,posy,mymarkers) {

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
      //this.addMarker(this.marker);
      this.renderMarkers(mymarkers);
      mapEle.classList.add('show-map');
    });
  }

  addMarker(marker: Marker) {
    const settingicono = {
      url: marker.icono, // url
      scaledSize: new google.maps.Size(30, 30), // scaled size
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
          Ruta: marker.ruta,
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

  //Permite agregar varios marcadores
  renderMarkers(markers) {
    markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

}
