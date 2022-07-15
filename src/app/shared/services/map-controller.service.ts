import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marker } from '../interfaces/sigo.interface';

const apiKey = "AIzaSyBu26lqG9z_LhLjkHjmk_Qr_G_JLkfrNNA";

@Injectable({
  providedIn: 'root'
})
export class MapControllerService {

  private marker: Marker = null;

  constructor(private http: HttpClient) { }

  getMarker(){
    return this.marker;
  }

  setMarker(marker: Marker){
    this.marker = marker;
  }

  resetMarker(){
    this.marker = null;
  }

  getHttpData(marker: Marker){
    //var link = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${marker.position.lat},${marker.position.lng}$lang=es-DO$ApiKey=${apiKey}`;
    var link = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.position.lat},${marker.position.lng}0&key=AIzaSyBu26lqG9z_LhLjkHjmk_Qr_G_JLkfrNNA`;
    return this.http.get(link);
  }

}
