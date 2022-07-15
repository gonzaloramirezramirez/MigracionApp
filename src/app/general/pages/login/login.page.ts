import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralServiceService } from '../../services/general-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Empresa } from 'src/app/shared/interfaces/sigo.interface';
import { map, timeout } from 'rxjs/operators';
import { SystemConfig } from 'src/app/shared/const/sigo.const';

@Component({
  selector: 'sigo-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  empresas: Empresa[];
  listEmpresas: Empresa[];
  visibleEmpresas: boolean = false;

  constructor(
    private generalService: GeneralServiceService, 
    private router: Router,
    private fb: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    ) { 

    }

  ngOnInit() {
    //this.login();
    this.credentials = this.fb.group({
      user: ['dem', [Validators.required]],
      password: ['DEMO4321', [Validators.required, Validators.minLength(8)]],
      empr: ['', [Validators.required]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    //Validar usuario, password y empresa
    if (!this.hasUser(this.credentials.value)) {
      await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'El usuario es obligatorio.',
          message: '',//res.error,
          buttons: ['OK'],
        });
        await alert.present();
    } else {
      if (!this.hasPassword(this.credentials.value)) {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'La contraseña es obligatoria.',
          message: '',//res.error,
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        if (!this.hasEmpr(this.credentials.value)) {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Debe seleccionar una empresa.',
            message: '',//res.error,
            buttons: ['OK'],
          });
          await alert.present();
        } else {
          this.generalService.login(this.credentials.value).subscribe(
            async (res) => {
              await loading.dismiss();
              /*var respuesta = res;
              console.log(respuesta);*/
              //this.generalService.setCurrentUser(this.get_user());
              this.generalService.setCurrentEmpr(this.get_empr());
              this.generalService.SetCredentials(res, this.credentials.value,this.listEmpresas);
              this.router.navigate(['/home']);
            }, async (res) => {
              await loading.dismiss();
              const alert = await this.alertController.create({
                header: 'Datos inválidos para inicio de sesión.',
                message: '',//res.error,
                buttons: ['OK'],
              });
       
              await alert.present();
            }
          );
        }
      } 
    }   
  }

  async onUserSet(){

    if (this.hasUser(this.credentials.value)) {
      const loading = await this.loadingController.create();
      await loading.present();
      let visible: boolean = true;

      this.listEmpresas = await this.generalService.getEmpresas(this.credentials.value)
      .pipe(
          map(response => {
            if(response){
              return response.map(item => <Empresa>{
                Usuario: item.Usuario,
                CodSistema: item.CodSistema,
                CodEmpresa: item.CodEmpresa,
                CodigoRefEmpresa: item.CodigoRefEmpresa,
                NombreEmpresa: item.NombreEmpresa,
                LogoEmpresa: item.LogoEmpresa,
                DescEmpresa: item.DescEmpresa,
                Icon: 'home'
              });
            }else{
              visible = false;
            }
              
          }),
          timeout(SystemConfig.timeOut)
      )
      .toPromise<Empresa[]>();
      
      if(!visible){
        this.visibleEmpresas = false;
      }else{
        this.visibleEmpresas = true;
      }
      
      await loading.dismiss();
      this.generalService.setEmpresasUser(this.listEmpresas);

    }
  }

  hasUser (credentials: {user}) {
    return (credentials.user !== '');
  }

  hasPassword (credentials: {password}) {
    return (credentials.password !== '');
  }

  hasEmpr (credentials: {empr}) {
    return (credentials.empr !== '');
  }

  get_user() {
    return this.credentials.get('user');
  }
  
  get_password() {
    return this.credentials.get('password');
  }

  get_empr() {
    return this.credentials.get('empr');
  }

  get user() {
    return this.credentials.get('user');
  }
  
  get password() {
    return this.credentials.get('password');
  }

  get empr() {
    return this.credentials.get('empr');
  }

}
