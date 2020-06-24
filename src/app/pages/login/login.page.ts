import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiService } from '../../services/ui-service.service';
import { IUsuario } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slidePrincipal: IonSlides;

  loginUser = {
    email: 'test@test.com',
    password: 'password'
  };

  registerUser: IUsuario = {
    avatar: 'av-1.png',
    email: 'test',
    nombre: 'Test',
    password: 'password',
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiService
  ) { }

  ngOnInit() {
  }
  
  ionViewDidEnter() {
    this.slidePrincipal.lockSwipes(true);
  }

  async login( formLogin: NgForm ) {
    this.uiService.toastInformativo('Cargando ...');
    if(formLogin.invalid) return;

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    
    if(valido) {
      this.navCtrl.navigateRoot('/main/tabs/home', { animated: true });
    } else {
      this.uiService.alertaInformativa( 'Usuario / contraseña incorrectos' );
    }
  }

  async registro(formSignUp: NgForm) {
    if(formSignUp.invalid) return;

    const valido = await this.usuarioService.registro( this.registerUser );
    
    if(valido) this.navCtrl.navigateRoot('/main/tabs/home', { animated: true });
    else this.uiService.alertaInformativa( 'El correo electrónico ya existe' );
  }

  mostrarRegistro() {
    this.slidePrincipal.lockSwipes(false);
    this.slidePrincipal.slideTo(0);
    this.slidePrincipal.lockSwipes(true);
  }

  mostrarLogin() {
    this.slidePrincipal.lockSwipes(false);
    this.slidePrincipal.slideTo(1);
    this.slidePrincipal.lockSwipes(true);
  }

}
