import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sigo-despachos-recoleccion',
  templateUrl: './despachos-recoleccion.page.html',
  styleUrls: ['./despachos-recoleccion.page.scss'],
})
export class DespachosRecoleccionPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  goToEmpresas(){
    this.router.navigate(['/home'])
  }

}
