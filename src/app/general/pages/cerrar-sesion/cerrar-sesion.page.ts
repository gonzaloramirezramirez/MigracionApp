import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralServiceService } from '../../services/general-service.service';

@Component({
  selector: 'sigo-cerrar-sesion',
  templateUrl: './cerrar-sesion.page.html',
  styleUrls: ['./cerrar-sesion.page.scss'],
})
export class CerrarSesionPage implements OnInit {

  constructor(
    private router: Router,
    private generalService: GeneralServiceService
  ) { }

  ngOnInit() {
    this.logout();
  }

  async logout() {
    await this.generalService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
    this.router.navigate(['/login']);
  }

}
