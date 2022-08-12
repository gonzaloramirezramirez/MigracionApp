import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'despachos-recoleccion',
    loadChildren: () => import('./operaciones/pages/despachos-recoleccion/despachos-recoleccion.module').then( m => m.DespachosRecoleccionPageModule)
  },
  {
    path: 'supervisor-recoleccion',
    loadChildren: () => import('./operaciones/pages/supervisor-recoleccion/supervisor-recoleccion.module').then( m => m.SupervisorRecoleccionPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./general/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'empresas',
    loadChildren: () => import('./general/pages/empresas/empresas.module').then( m => m.EmpresasPageModule)
  },
  {
    path: 'cerrar-sesion',
    loadChildren: () => import('./general/pages/cerrar-sesion/cerrar-sesion.module').then( m => m.CerrarSesionPageModule)
  },
  {
    path: 'ultimaubicacion/:IdVehiculo',
    loadChildren: () => import('./general/pages/ultimaubicacion/ultimaubicacion.module').then( m => m.UltimaubicacionPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'recorridoruta/:IdDespacho/:NumeroViaje/:Vehiculo/:Ruta/:IdRuta/:TipoVehiculo',
    loadChildren: () => import('./general/pages/recorridoruta/recorridoruta.module').then( m => m.RecorridorutaPageModule)
    //
  },
  {
    path: 'inspeccion',
    loadChildren: () => import('./general/pages/inspeccion/inspeccion.module').then( m => m.InspeccionPageModule)
  },
  {
    path: 'inspeccionrecoleccion',
    loadChildren: () => import('./general/pages/inspeccionrecoleccion/inspeccionrecoleccion.module').then( m => m.InspeccionrecoleccionPageModule)
  },
  {
    path: 'menunovedadessupervisor',
    loadChildren: () => import('./general/pages/menunovedadessupervisor/menunovedadessupervisor.module').then( m => m.MenunovedadessupervisorPageModule)
  },
  {
    path: 'recorridoxrutaprogramada',
    loadChildren: () => import('./general/pages/recorridoxrutaprogramada/recorridoxrutaprogramada.module').then( m => m.RecorridoxrutaprogramadaPageModule)
  },
  {
    path: 'ltanovedadtiempo',
    loadChildren: () => import('./general/pages/ltanovedadtiempo/ltanovedadtiempo.module').then( m => m.LtanovedadtiempoPageModule)
  },
  {
    path: 'menusupbarrido',
    loadChildren: () => import('./general/pages/menusupbarrido/menusupbarrido.module').then( m => m.MenusupbarridoPageModule)
  },
  {
    path: 'autorizacion',
    loadChildren: () => import('./general/pages/autorizacion/autorizacion.module').then( m => m.AutorizacionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
